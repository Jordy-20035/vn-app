# Alterra - Visual Novel Telegram Mini App

**Alterra** — это приложение-сборник визуальных новелл нового поколения с искусственным интеллектом, созданное для Telegram Mini Apps.

## 🎯 Миссия проекта

Alterra создаёт уникальный опыт чтения и игры в визуальные новеллы. С помощью искусственного интеллекта мы превращаем каждую историю в живой мир, где читатель сам становится соавтором сюжета.

## ✨ Основные возможности

### Игровая механика
- **Двойная валютная система:**
  - ⚡ **Энергия** (макс. 4 ед.) - восстанавливается 1 ед./2 часа, нужна для открытия серий
  - 💎 **Алмазы** - для платных выборов и премиум-действий
  
- **Типы выборов:**
  - 🆓 Бесплатные фиксированные выборы
  - ✨ Свободные действия (AI-генерация)
  - 💎 Платные выборы за алмазы
  - 🔒 Выборы, требующие определённых статов

- **Система характеристик:**
  - ⚖️ Честность
  - 🎭 Хитрость
  - ⭐ Репутация
  - 💎 Обаяние

### Монетизация
- **Реклама:**
  - Перед началом серии
  - После завершения серии
  - Бонусная реклама раз в 1.5 часа (+2 💎)
  
- **Магазин:**
  - Покупка алмазов за Telegram Stars
  - Различные наборы с бонусами

### Прогресс
- Автосохранение прогресса
- Сброс прогресса серии/сезона/истории
- Отслеживание выполненных серий
- Статистика заработанных характеристик

## 🚀 Установка и запуск

### Требования
- Node.js 18+ 
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
```

Готовые файлы будут в папке `dist/`

## 📱 Настройка Telegram Mini App

### 1. Создание бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Создайте нового бота командой `/newbot`
3. Сохраните токен бота

### 2. Настройка Mini App

1. В BotFather отправьте `/newapp`
2. Выберите своего бота
3. Заполните информацию:
   - **Title:** Alterra
   - **Description:** Визуальные новеллы нового поколения
   - **Photo:** Загрузите обложку 640×360
   - **Demo GIF/Video:** (опционально)
   - **Web App URL:** URL вашего хостинга (например, на Vercel/Netlify)

### 3. Деплой приложения

#### Vercel (рекомендуется)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 4. Настройка Telegram Payments

Для интеграции платежей:

1. В BotFather используйте `/mybots`
2. Выберите бота → Payments
3. Подключите Telegram Stars как провайдера платежей

## 🏗️ Структура проекта

```
src/
├── components/          # React компоненты
│   ├── SceneViewer.jsx     # Просмотрщик сцен
│   ├── StoryCard.jsx       # Карточка истории
│   ├── StoryModal.jsx      # Модальное окно истории
│   ├── CurrencyPanel.jsx   # Панель валют
│   ├── Shop.jsx            # Магазин
│   ├── AdScreen.jsx        # Экран рекламы
│   ├── EpisodeSummary.jsx  # Итоги серии
│   ├── ProgressManager.jsx # Управление прогрессом
│   └── Toast.jsx           # Уведомления
│
├── contexts/           # React контексты
│   ├── TelegramContext.jsx # Telegram WebApp API
│   └── GameContext.jsx     # Игровое состояние
│
├── data/              # Данные игры
│   ├── stories.json      # Информация об историях
│   └── scenes.json       # Сцены и выборы
│
├── assets/            # Ресурсы
│   ├── backgrounds/      # Фоны локаций
│   ├── characters/       # Спрайты персонажей
│   └── audio/           # Музыка и звуки
│
├── App.jsx           # Главный компонент
├── main.jsx         # Точка входа
└── index.css        # Стили
```

## 📝 Добавление нового контента

### Добавление новой истории

Отредактируйте `src/data/stories.json`:

```json
{
  "stories": [
    {
      "id": "story_new",
      "title": "Название истории",
      "cover": "/src/assets/story-cover.png",
      "tomeSplash": "/src/assets/tome-splash.png",
      "tome": 1,
      "annotation": "Описание истории...",
      "episodesCount": 10,
      "locked": false,
      "startSceneId": "scene_new_001",
      "episodes": [
        {
          "id": "ep_1",
          "title": "Название серии",
          "sceneIds": ["scene_new_001", "scene_new_002"]
        }
      ]
    }
  ]
}
```

### Добавление новой сцены

Отредактируйте `src/data/scenes.json`:

```json
{
  "scene_new_001": {
    "id": "scene_new_001",
    "title": "Название сцены",
    "image": "/assets/background.jpg",
    "speaker": "Имя персонажа",
    "text": "Текст сцены...",
    "choices": [
      {
        "id": "choice_1",
        "label": "Текст выбора",
        "goto": "scene_new_002",
        "effects": { "honesty": 1, "reputation": 2 }
      },
      {
        "id": "choice_2",
        "label": "Платный выбор",
        "goto": "scene_new_003",
        "cost": 30,
        "effects": { "cunning": 2 }
      },
      {
        "id": "choice_3",
        "label": "Выбор с требованием",
        "goto": "scene_new_004",
        "requiredStats": { "charm": 5 },
        "effects": { "reputation": 3 }
      },
      {
        "id": "free",
        "label": "✨ Свободное действие...",
        "free": true
      }
    ],
    "meta": { "locId": "location_id" }
  }
}
```

## 🤖 Интеграция AI

В будущих версиях планируется интеграция с AI для обработки свободных действий:

```javascript
// Пример интеграции с OpenAI
async function processFreeAction(action, intent, context) {
  const response = await fetch('YOUR_AI_API_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({
      action,
      intent,
      context: {
        scene: context.currentScene,
        stats: context.playerStats,
        history: context.recentChoices
      }
    })
  });
  
  return response.json();
}
```

## 🎨 Кастомизация

### Изменение цветовой схемы

Отредактируйте `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #fbbf24;
}
```

### Настройка валют

Отредактируйте константы в `src/contexts/GameContext.jsx`:

```javascript
const ENERGY_MAX = 4;
const ENERGY_REGEN_TIME = 2 * 60 * 60 * 1000; // 2 часа
const COINS_AD_AMOUNT = 2;
const COINS_AD_COOLDOWN = 1.5 * 60 * 60 * 1000; // 1.5 часа
const COINS_EPISODE_REWARD = 8;
```

## 📊 Аналитика и метрики

Для отслеживания поведения игроков рекомендуется интегрировать:

- Google Analytics
- Amplitude
- Mixpanel
- Telegram Analytics

## 🔒 Безопасность

⚠️ **Важно:**
- Никогда не храните чувствительные данные в localStorage
- Используйте server-side валидацию для покупок
- Проверяйте Telegram WebApp initData на бэкенде

## 📄 Лицензия

MIT License - см. файл LICENSE

## 👥 Команда

Разработано для хакатона Цифра-Хак

## 🆘 Поддержка

Если у вас возникли вопросы или проблемы:
- Создайте Issue на GitHub
- Напишите в Telegram: [@alterra_support](https://t.me/alterra_support)

## 🚀 Roadmap

- [ ] Интеграция с AI для обработки свободных действий
- [ ] Мультиязычность (EN, RU, ES)
- [ ] Достижения и бейджи
- [ ] Социальные функции (поделиться результатами)
- [ ] Редактор историй для авторов
- [ ] Облачное сохранение прогресса
- [ ] Анимации и визуальные эффекты
- [ ] Звуковое сопровождение

---

**Сделано с ❤️ для Telegram Mini Apps Hackathon**
