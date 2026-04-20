const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const Anthropic = require('@anthropic-ai/sdk');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Config ---

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'owner/repo';
const GITHUB_KB_PATH = process.env.GITHUB_KB_PATH || 'knowledge-base';
const COMPANY_NAME = process.env.COMPANY_NAME || 'TERMY';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HISTORY = 10;

if (!ANTHROPIC_API_KEY) {
  console.error('FATAL: ANTHROPIC_API_KEY is not set');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// --- Middleware ---

app.use(cors());
app.use(express.json({ limit: '16kb' }));

app.use('/api/', rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Слишком много запросов. Попробуйте через минуту.' },
}));

// Serve widget as static
app.use('/widget', express.static('widget', {
  setHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=300');
  },
}));

// --- KB Cache ---

let kbCache = { content: null, fetchedAt: 0 };

async function fetchKnowledgeBase() {
  const now = Date.now();
  if (kbCache.content && now - kbCache.fetchedAt < CACHE_TTL_MS) {
    return kbCache.content;
  }

  console.log('[KB] Fetching knowledge base from GitHub...');

  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'termy-chat-widget',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const listUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_KB_PATH}`;
    const listRes = await fetch(listUrl, { headers });

    if (!listRes.ok) {
      throw new Error(`GitHub API ${listRes.status}: ${listRes.statusText}`);
    }

    const files = await listRes.json();
    const mdFiles = files.filter(f => f.name.endsWith('.md'));

    const contents = await Promise.all(
      mdFiles.map(async (f) => {
        const fileRes = await fetch(f.download_url, { headers: { 'User-Agent': 'termy-chat-widget' } });
        if (!fileRes.ok) return null;
        const text = await fileRes.text();
        return `## Файл: ${f.name}\n\n${text}`;
      })
    );

    const result = contents.filter(Boolean).join('\n\n---\n\n');
    kbCache = { content: result, fetchedAt: now };
    console.log(`[KB] Loaded ${mdFiles.length} files, ${result.length} chars`);
    return result;
  } catch (err) {
    console.error('[KB] GitHub fetch failed:', err.message);
    if (kbCache.content) {
      console.log('[KB] Using stale cache');
      return kbCache.content;
    }
    return null;
  }
}

// --- Sessions ---

const sessions = new Map();

function getSession(sessionId) {
  if (!sessionId || !sessions.has(sessionId)) {
    const id = sessionId || crypto.randomUUID();
    sessions.set(id, { messages: [], createdAt: Date.now() });
    return { id, session: sessions.get(id) };
  }
  return { id: sessionId, session: sessions.get(sessionId) };
}

// Cleanup old sessions every 30 min
setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [id, s] of sessions) {
    if (s.createdAt < cutoff) sessions.delete(id);
  }
}, 30 * 60 * 1000);

// --- Routes ---

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Сообщение не может быть пустым.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Сообщение слишком длинное (макс. 2000 символов).' });
  }

  const { id, session } = getSession(sessionId);

  try {
    const kb = await fetchKnowledgeBase();

    const systemPrompt = [
      `Ты — AI-ассистент компании ${COMPANY_NAME}. Отвечай ТОЛЬКО на основе предоставленной базы знаний. Если ответа нет в базе — вежливо скажи что не можешь помочь с этим вопросом и предложи связаться с менеджером по телефону +7 (800) 101-15-25 или email info@termybrand.com. Отвечай на русском языке, кратко и по делу.`,
      kb
        ? `\n\nБаза знаний:\n\n${kb}`
        : '\n\nБаза знаний временно недоступна. Сообщи пользователю, что можешь ответить на общие вопросы, и предложи связаться с менеджером для получения детальной информации.',
    ].join('');

    session.messages.push({ role: 'user', content: message.trim() });

    // Keep only last MAX_HISTORY messages
    if (session.messages.length > MAX_HISTORY) {
      session.messages = session.messages.slice(-MAX_HISTORY);
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: session.messages,
    });

    const assistantMessage = response.content[0].text;
    session.messages.push({ role: 'assistant', content: assistantMessage });

    res.json({
      reply: assistantMessage,
      sessionId: id,
    });
  } catch (err) {
    console.error('[Chat] Error:', err.message);

    // Don't leave a dangling user message on error
    if (session.messages.length && session.messages[session.messages.length - 1].role === 'user') {
      session.messages.pop();
    }

    if (err.status === 429) {
      return res.status(429).json({ error: 'Сервис временно перегружен. Попробуйте через минуту.' });
    }

    res.status(500).json({ error: 'Не удалось получить ответ. Попробуйте позже.' });
  }
});

// --- Start ---

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
  // Warm up KB cache
  fetchKnowledgeBase().catch(() => {});
});
