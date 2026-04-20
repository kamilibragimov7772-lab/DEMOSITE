(function () {
  'use strict';

  // --- Config from script tag ---
  var script = document.currentScript;
  var API_URL = script.getAttribute('data-api') || '';
  var PRIMARY = script.getAttribute('data-color') || '#7D46AF';
  var TITLE = script.getAttribute('data-title') || 'Ассистент TERMY';
  var GREETING = script.getAttribute('data-greeting') ||
    'Здравствуйте! Я AI-ассистент. Задайте вопрос о нашей продукции, и я постараюсь помочь.';

  if (!API_URL) {
    // Derive from script src
    var src = script.src;
    API_URL = src.substring(0, src.lastIndexOf('/widget/')) || src.substring(0, src.lastIndexOf('/'));
  }

  var sessionId = null;
  var isOpen = false;
  var isLoading = false;

  // --- Styles ---
  var css = `
    #tw-chat-btn{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:${PRIMARY};border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);z-index:99999;display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}
    #tw-chat-btn:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(0,0,0,.3)}
    #tw-chat-btn svg{width:28px;height:28px;fill:#fff}
    #tw-chat-win{position:fixed;bottom:100px;right:24px;width:380px;height:520px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.18);z-index:99999;display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
    #tw-chat-win.tw-open{display:flex}
    #tw-chat-hdr{background:${PRIMARY};color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
    #tw-chat-hdr-info h3{margin:0;font-size:15px;font-weight:600;line-height:1.2}
    #tw-chat-hdr-info span{font-size:12px;opacity:.85;display:flex;align-items:center;gap:4px;margin-top:2px}
    #tw-chat-hdr-info span::before{content:'';width:7px;height:7px;background:#4ade80;border-radius:50%;display:inline-block}
    #tw-chat-close{background:none;border:none;color:#fff;cursor:pointer;padding:4px;opacity:.8;transition:opacity .15s}
    #tw-chat-close:hover{opacity:1}
    #tw-chat-close svg{width:20px;height:20px;fill:currentColor}
    #tw-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:#f8f9fa}
    .tw-msg{max-width:82%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.5;word-wrap:break-word;white-space:pre-wrap}
    .tw-msg a{color:inherit;text-decoration:underline}
    .tw-msg-bot{background:#fff;color:#1a1a1a;align-self:flex-start;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
    .tw-msg-user{background:${PRIMARY};color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
    .tw-typing{align-self:flex-start;background:#fff;padding:10px 18px;border-radius:12px;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;gap:5px;align-items:center}
    .tw-dot{width:7px;height:7px;background:#999;border-radius:50%;animation:tw-bounce .6s infinite alternate}
    .tw-dot:nth-child(2){animation-delay:.15s}
    .tw-dot:nth-child(3){animation-delay:.3s}
    @keyframes tw-bounce{from{opacity:.3;transform:translateY(0)}to{opacity:1;transform:translateY(-4px)}}
    #tw-chat-input{display:flex;padding:12px;border-top:1px solid #e5e7eb;background:#fff;flex-shrink:0;gap:8px}
    #tw-chat-input textarea{flex:1;border:1px solid #d1d5db;border-radius:10px;padding:10px 14px;font-size:14px;font-family:inherit;resize:none;outline:none;min-height:20px;max-height:80px;line-height:1.4;transition:border-color .15s}
    #tw-chat-input textarea:focus{border-color:${PRIMARY}}
    #tw-chat-input textarea::placeholder{color:#9ca3af}
    #tw-chat-send{width:40px;height:40px;border-radius:10px;background:${PRIMARY};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s;align-self:flex-end}
    #tw-chat-send:disabled{opacity:.5;cursor:default}
    #tw-chat-send svg{width:18px;height:18px;fill:#fff}
    .tw-err{background:#fef2f2;color:#dc2626;font-size:13px;padding:8px 12px;border-radius:8px;align-self:center;text-align:center}
    @media(max-width:480px){
      #tw-chat-win{bottom:0;right:0;left:0;width:100%;height:100%;border-radius:0}
      #tw-chat-btn{bottom:16px;right:16px;width:54px;height:54px}
    }
  `;

  // --- Inject styles ---
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // --- Build DOM ---
  // Toggle button
  var btn = document.createElement('button');
  btn.id = 'tw-chat-btn';
  btn.setAttribute('aria-label', 'Открыть чат');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';

  // Chat window
  var win = document.createElement('div');
  win.id = 'tw-chat-win';
  win.innerHTML = [
    '<div id="tw-chat-hdr">',
      '<div id="tw-chat-hdr-info"><h3>' + escHtml(TITLE) + '</h3><span>Онлайн</span></div>',
      '<button id="tw-chat-close" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>',
    '</div>',
    '<div id="tw-chat-msgs"></div>',
    '<div id="tw-chat-input">',
      '<textarea rows="1" placeholder="Введите сообщение..." id="tw-chat-ta"></textarea>',
      '<button id="tw-chat-send" aria-label="Отправить"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>',
    '</div>',
  ].join('');

  document.body.appendChild(btn);
  document.body.appendChild(win);

  var msgs = document.getElementById('tw-chat-msgs');
  var ta = document.getElementById('tw-chat-ta');
  var sendBtn = document.getElementById('tw-chat-send');

  // --- Events ---
  btn.addEventListener('click', toggle);
  document.getElementById('tw-chat-close').addEventListener('click', toggle);

  sendBtn.addEventListener('click', send);
  ta.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  // Auto-resize textarea
  ta.addEventListener('input', function () {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 80) + 'px';
  });

  // --- Functions ---
  function toggle() {
    isOpen = !isOpen;
    win.classList.toggle('tw-open', isOpen);
    if (isOpen && msgs.children.length === 0) {
      addMessage(GREETING, 'bot');
    }
    if (isOpen) ta.focus();
  }

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'tw-msg tw-msg-' + type;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'tw-typing';
    div.id = 'tw-typing';
    div.innerHTML = '<div class="tw-dot"></div><div class="tw-dot"></div><div class="tw-dot"></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('tw-typing');
    if (el) el.remove();
  }

  function showError(text) {
    var div = document.createElement('div');
    div.className = 'tw-err';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function send() {
    var text = ta.value.trim();
    if (!text || isLoading) return;

    addMessage(text, 'user');
    ta.value = '';
    ta.style.height = 'auto';
    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    fetch(API_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: sessionId }),
    })
      .then(function (r) {
        if (!r.ok) return r.json().then(function (d) { throw new Error(d.error || 'Ошибка сервера'); });
        return r.json();
      })
      .then(function (data) {
        hideTyping();
        sessionId = data.sessionId;
        addMessage(data.reply, 'bot');
      })
      .catch(function (err) {
        hideTyping();
        showError(err.message || 'Не удалось отправить сообщение. Проверьте соединение.');
      })
      .finally(function () {
        isLoading = false;
        sendBtn.disabled = false;
        ta.focus();
      });
  }

  function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }
})();
