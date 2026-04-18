# TERMY — Demo Phase 1

Рабочий demo-прототип Phase 1 для проекта **приложение для производства TERMY**.

> ⚠ Это **демо**, не production. Модули M3 (Склад) и M4 (Сменный выпуск) намеренно заблокированы и показаны как placeholder. Интеграции с 1С УНФ, Bitrix24, ЭДО, Telegram — **не реализованы**. Все mock-сущности помечены `demo: true`.

## Запуск

```bash
cd demo_build
npm install
npm run dev
```

Откроется на `http://localhost:5173/`.

## Сборка production-артефакта (static)

```bash
npm run build
npm run preview
```

## Стек

React 18 + Vite + TypeScript + TailwindCSS + React Router 6 + react-pdf.

## Структура

См. `TERMY_Knowledge_Project/07_Output/TERMY_06_Demo_Build_Spec.md` раздел 4.

## Демо-скрипт показа

См. `demo_script.md` (30 минут на 7 экранов).

## Известные ограничения

См. `KNOWN_LIMITATIONS.md`.

## Source-of-truth

- Продуктовый spec: `TERMY_Knowledge_Project/07_Output/TERMY_04B_Phase1_Product_Spec.md`.
- Карта экранов: `.../TERMY_04B_Screen_and_Route_Map.md`.
- Критерии приёмки: `.../TERMY_04B_Acceptance_Criteria_Matrix.md`.
- Демо-спека: `.../TERMY_05_Demo_Spec.md`.
- Контракты данных: `.../TERMY_06B_Demo_Mock_Data_Contract.md`.
