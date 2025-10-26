# 🎭 Alterra - AI-Powered Visual Novel Telegram Mini App

> Визуальные новеллы нового поколения с искусственным интеллектом для Telegram

**Alterra** — приложение-сборник интерактивных визуальных новелл, где выбор игрока действительно важен. AI (YandexGPT) позволяет игрокам создавать собственные варианты действий, выходя за рамки заранее написанных сценариев.

---

## 🌟 Ключевые особенности

### ✨ AI-интеграция (YandexGPT)
- **Свободные действия** - игрок может написать любое действие, AI обработает его в контексте истории
- **Динамическая вероятность** - успех зависит от статов игрока и контекста сцены
- **Изменение статов** - AI определяет, как действия влияют на характеристики персонажа
- **Нарративная генерация** - атмосферные описания результатов в стиле визуальной новеллы

### 🎮 Игровая механика

#### Двойная валютная система
- ⚡ **Энергия** (макс. 4 ед.)
  - Восстановление: 1 ед. каждые 2 часа
  - Используется для открытия новых серий
  
- 💎 **Алмазы**
  - Для премиум-выборов в историях
  - Покупка за Telegram Stars
  - +2 за просмотр рекламы (раз в 1.5 часа)
  - +8 за завершение серии

#### Типы выборов
- 🆓 **Фиксированные** - обычные заранее написанные варианты
- ✨ **Свободные** - AI генерирует результат на основе вашего действия
- 💎 **Платные** - премиум-варианты за алмазы
- 🔒 **Stat-locked** - требуют определённых характеристик

#### Система характеристик
- ⚖️ **Честность** - влияет на социальные взаимодействия
- 🎭 **Хитрость** - помогает в обмане и манипуляциях
- ⭐ **Репутация** - открывает новые возможности
- 💎 **Обаяние** - улучшает шансы убеждения

### 🎬 Система диалогов

#### Пошаговые диалоги с анимациями
- **Typewriter effect** - текст печатается буква за буквой (80ms/символ)
- **Fade-in/Fade-out** - плавное появление/исчезновение персонажей
- **Динамические спрайты** - смена эмоций и поз персонажей
- **Кнопка "Далее"** - контроль темпа повествования
- **Индикатор прогресса** - показывает текущую реплику из общего числа

#### Обратная совместимость
Поддержка двух форматов сцен:
- **Новый формат** - массив `dialogue` для пошаговых диалогов
- **Legacy формат** - `text` + `characters` для быстрого показа

### 💰 Монетизация

#### Реклама
- Перед началом каждой серии
- После завершения серии
- Бонусная реклама: +2 💎 (раз в 1.5 часа)

#### Магазин
- Покупка алмазов за Telegram Stars
- Пакеты: 50, 150, 500, 1500 💎
- Встроенная интеграция Telegram Payments

### 💾 Прогресс
- **Автосохранение** - весь прогресс сохраняется локально
- **Сброс прогресса** - серии, сезона или всей истории
- **Статистика** - отслеживание заработанных характеристик
- **Итоги серии** - экран с результатами после завершения эпизода

---

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- npm или yarn
- Telegram Bot Token
- YandexGPT API credentials

### 1. Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/Jordy-20035/vn-app/
cd vn-app

# Установите зависимости
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# YandexGPT API
VITE_YANDEX_API_KEY=your_yandex_api_key_here
VITE_YANDEX_FOLDER_ID=your_yandex_folder_id_here
```

**Где получить YandexGPT credentials:**
1. Перейдите на [Yandex Cloud Console](https://console.cloud.yandex.ru/)
2. Создайте каталог (folder) или используйте существующий
3. В разделе "Сервисные аккаунты" создайте новый аккаунт
4. Назначьте роль `ai.languageModels.user`
5. Создайте API ключ для сервисного аккаунта
6. Скопируйте:
   - **API Key** → `VITE_YANDEX_API_KEY`
   - **Folder ID** → `VITE_YANDEX_FOLDER_ID`

### 3. Запуск локально

```bash
# Режим разработки
npm run dev

# Приложение доступно на http://localhost:5173
```

### 4. Сборка для продакшена

```bash
npm run build
```

Готовые файлы будут в папке `dist/`

---

## 📱 Развёртывание Telegram Mini App

### Шаг 1: Создание Telegram бота

1. Откройте [@BotFather](https://t.me/BotFather)
2. Создайте бота: `/newbot`
3. Следуйте инструкциям, сохраните токен

### Шаг 2: Деплой на Vercel (рекомендуется)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

**⚠️ ВАЖНО:** После деплоя установите environment variables в Vercel:

1. Откройте проект в [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Добавьте:
   - `VITE_YANDEX_API_KEY` = ваш API ключ
   - `VITE_YANDEX_FOLDER_ID` = ваш Folder ID
4. Redeploy проекта

### Шаг 3: Создание Mini App

1. В BotFather: `/newapp`
2. Выберите вашего бота
3. Заполните информацию:
   - **Title:** Alterra
   - **Description:** Визуальные новеллы с AI
   - **Photo:** 640×360px обложка
   - **Web App URL:** `https://your-vercel-url.vercel.app`

4. Получите short name вашего Mini App

### Шаг 4: Настройка бота

```
/setdescription - установите описание бота
/setcommands - добавьте команды:
  start - Запустить Alterra
  play - Открыть каталог историй
  
/setmenubutton - установите кнопку меню:
  - Text: "🎭 Играть"
  - URL: https://t.me/YOUR_BOT_USERNAME/YOUR_APP_SHORT_NAME
```

### Альтернатива: Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

Не забудьте установить environment variables в Netlify Dashboard!

---

## 📂 Структура проекта

```
vn-app/
├── api/                          # Vercel Serverless Functions
│   └── yandex-gpt.js            # Proxy для YandexGPT API (обход CORS)
│
├── src/
│   ├── components/              # React компоненты
│   │   ├── SceneViewer.jsx     # Отображение сцен и выборов
│   │   ├── DialogueViewer.jsx  # Система пошаговых диалогов
│   │   ├── StoryCard.jsx       # Карточка истории в каталоге
│   │   ├── StoryModal.jsx      # Модальное окно с деталями истории
│   │   ├── CurrencyPanel.jsx   # Панель энергии и алмазов
│   │   ├── Shop.jsx            # Магазин алмазов
│   │   ├── AdScreen.jsx        # Экран рекламы
│   │   ├── EpisodeSummary.jsx  # Итоги серии
│   │   ├── ProgressManager.jsx # Управление прогрессом
│   │   └── Toast.jsx           # Уведомления
│   │
│   ├── contexts/               # React Contexts
│   │   ├── TelegramContext.jsx # Telegram WebApp SDK
│   │   └── GameContext.jsx     # Игровое состояние (валюты, статы, прогресс)
│   │
│   ├── services/               # Сервисы
│   │   └── yandexGPT.js       # Интеграция с YandexGPT API
│   │
│   ├── data/                   # Игровые данные
│   │   ├── stories.json        # Список историй
│   │   ├── scenes.json         # Сцены и выборы
│   │   ├── scenes-new-format-example.json  # Пример нового формата
│   │   ├── characters.json     # Данные персонажей
│   │   ├── lore/
│   │   │   └── world.json     # Лор мира
│   │   └── prompts/
│   │       └── system-prompt.txt  # Промпт для AI
│   │
│   ├── assets/                 # Медиа-ресурсы
│   │   ├── backgrounds/       # Фоны локаций
│   │   ├── characters/        # Спрайты персонажей
│   │   └── audio/            # Музыка (опционально)
│   │
│   ├── App.jsx               # Главный компонент
│   ├── main.jsx             # Точка входа
│   └── index.css            # Глобальные стили
│
├── public/                   # Статические файлы
│   └── assets/              # Копии ресурсов для продакшена
│
├── DIALOGUE_TEMPLATE.md     # Шаблон для написания сцен
├── package.json
├── vite.config.js
├── vercel.json              # Конфигурация Vercel
└── README.md
```

---

## 📝 Добавление контента

### Создание новой сцены

Используйте файл **`DIALOGUE_TEMPLATE.md`** - там подробная инструкция и примеры.

#### Краткий шаблон:

```json
{
  "scene_001": {
    "id": "scene_001",
    "image": "/assets/backgrounds/office.jpg",
    
    "dialogue": [
      {
        "speaker": "Анна",
        "text": "Текст реплики (1-3 предложения)",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-neutral.png",
          "x": "5%",
          "scale": 1.0
        }
      },
      {
        "speaker": "Секретарь",
        "text": "Ответная реплика",
        "character": {
          "id": "secretary",
          "image": "/assets/characters/sec-smile.png",
          "x": "75%",
          "scale": 1.0
        }
      }
    ],
    
    "choices": [
      {
        "id": "choice_1",
        "label": "Обычный выбор",
        "goto": "scene_002",
        "effects": { "honesty": 1 }
      },
      {
        "id": "choice_paid",
        "label": "Премиум выбор",
        "goto": "scene_003",
        "cost": 20,
        "effects": { "cunning": 2 }
      },
      {
        "id": "choice_locked",
        "label": "Убедить директора",
        "goto": "scene_004",
        "requiredStats": { "charm": 5 },
        "effects": { "reputation": 3 }
      },
      {
        "id": "free_action",
        "label": "✨ Свободное действие...",
        "free": true
      }
    ]
  }
}
```

### Позиции персонажей
- **Левый:** `"x": "5%"` до `"x": "15%"`
- **Правый:** `"x": "75%"` до `"x": "85%"`
- **Центр:** `"x": "45%"` до `"x": "55%"`

### Эмоции персонажей
Меняйте спрайт для отображения эмоций:
- `anna-neutral.png` - нейтральное состояние
- `anna-happy.png` - радость
- `anna-worried.png` - беспокойство
- `anna-angry.png` - гнев
- и т.д.

---

## 🤖 Как работает AI

### Обработка свободных действий

1. **Игрок вводит действие:**
   ```
   Что: Попросить кофе у секретаря
   Как: Вежливо
   ```

2. **Система отправляет в YandexGPT:**
   - Действие игрока
   - Контекст сцены (локация, персонажи)
   - Текущие статы игрока
   - Лор мира

3. **AI анализирует и возвращает:**
   ```json
   {
     "success": true,
     "outcome": "success",
     "narrative": "Секретарь улыбается и предлагает свежесваренный кофе...",
     "statsChange": { "charm": 1 },
     "nextScene": null
   }
   ```

4. **Система обновляет:**
   - Показывает нарративный ответ игроку
   - Обновляет статы персонажа
   - Даёт возможность выбрать основной вариант для продолжения

### System Prompt

AI использует детальный промпт из `src/data/prompts/system-prompt.txt`, который включает:
- Правила мира
- Контекст сцены
- Статы игрока
- Формат ответа

### Vercel Proxy

Для обхода CORS используется serverless функция `api/yandex-gpt.js`, которая:
- Принимает запросы от клиента
- Переадресует их в YandexGPT API
- Возвращает результат клиенту

---

## 🎨 Кастомизация

### Изменение валют

`src/contexts/GameContext.jsx`:

```javascript
const ENERGY_MAX = 4;
const ENERGY_REGEN_TIME = 2 * 60 * 60 * 1000; // 2 часа
const COINS_AD_AMOUNT = 2;
const COINS_EPISODE_REWARD = 8;
```

### Настройка цветов

`src/index.css`:

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #fbbf24;
}
```

### Скорость печати текста

`src/components/DialogueViewer.jsx`:

```javascript
// Измените prop speed (ms на символ)
<DialogueViewer dialogue={...} speed={80} />
```

---

## 🐛 Известные проблемы и решения

### AI не работает
**Проблема:** Свободные действия не обрабатываются

**Решение:**
1. Убедитесь, что environment variables установлены в Vercel/Netlify
2. Проверьте, что YandexGPT API ключ активен
3. Проверьте квоты YandexGPT в консоли

### Персонажи не отображаются
**Проблема:** Спрайты не видны на экране

**Решение:**
1. Проверьте пути к изображениям (`/assets/characters/...`)
2. Убедитесь, что файлы существуют в `public/assets/characters/`
3. Проверьте размер файлов (рекомендуется < 500KB)

### Статы накручиваются при двойном клике
**Проблема:** Это исправлено! Кнопки блокируются во время обработки.

---

## 🔧 Разработка

### Запуск dev сервера

```bash
npm run dev
```

### Проверка linter

```bash
npm run lint
```

### Build для продакшена

```bash
npm run build
npm run preview  # Предпросмотр сборки
```

---

## 📊 Технологии

- **Frontend:** React 19, Vite 7
- **Telegram:** @twa-dev/sdk
- **AI:** YandexGPT API
- **Hosting:** Vercel (serverless functions)
- **State:** React Context API
- **Storage:** localStorage (progress, currency, stats)
- **Payments:** Telegram Stars (planned)

---

## ✅ Статус проекта

### Реализовано
- ✅ Telegram Mini App интеграция
- ✅ Двойная валютная система (Energy + Coins)
- ✅ Система характеристик (4 стата)
- ✅ YandexGPT интеграция для свободных действий
- ✅ Пошаговые диалоги с typewriter effect
- ✅ Динамические спрайты персонажей
- ✅ 4 типа выборов (free, fixed, paid, stat-locked)
- ✅ Автосохранение прогресса
- ✅ Сброс прогресса
- ✅ Экран итогов серии
- ✅ Защита от двойных кликов
- ✅ Реклама (placeholders)
- ✅ Магазин алмазов (UI готов)
- ✅ Haptic feedback

### В разработке / TODO
- ⏳ Telegram Stars payments (API готов, нужно тестирование)
- ⏳ Реальная реклама (Telegram Ads)
- ⏳ Больше контента (сцены, персонажи, истории)
- ⏳ Звуковое сопровождение
- ⏳ Достижения
- ⏳ Облачное сохранение прогресса

---

## 🎯 Для хакатона

### Демо
- **Telegram Bot:** `@alterrrabot`
- **Mini App URL:** `https://t.me/alterrrabot/alterra`
- **Web версия:** `https://vn-app-git-main-jordy-20035s-projects.vercel.app/`


---

## 📄 Лицензия

MIT License

---

## 🤝 Контрибьюторы

Разработано для **Цифра-Хак Hackathon**

---

## 📞 Поддержка

Если у вас возникли вопросы:
- Telegram: [@alterra_support](https://t.me/Jo_Unnie)
- GitHub Issues

---

**Сделано с ❤️ и AI для Telegram Mini Apps**
