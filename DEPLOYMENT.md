# 🚀 Deployment Guide для Alterra

Это руководство описывает процесс деплоя Telegram Mini App на различные платформы.

## 📋 Предварительные требования

1. **Telegram Bot:**
   - Создан через [@BotFather](https://t.me/BotFather)
   - Получен токен бота
   - Настроено имя пользователя

2. **Сборка проекта:**
   ```bash
   npm run build
   ```
   Это создаст папку `dist/` с готовыми файлами.

## 🌐 Vercel (Рекомендуется)

### Преимущества:
- ✅ Бесплатный SSL
- ✅ Автоматический деплой из Git
- ✅ CDN по всему миру
- ✅ Простая настройка

### Шаги:

#### 1. Установка Vercel CLI
```bash
npm install -g vercel
```

#### 2. Логин
```bash
vercel login
```

#### 3. Деплой
```bash
vercel
```

Следуйте инструкциям в терминале:
- Set up and deploy? **Y**
- Which scope? Выберите свой аккаунт
- Link to existing project? **N**
- What's your project's name? **alterra-vn**
- In which directory is your code located? **.**
- Want to override the settings? **N**

#### 4. Production деплой
```bash
vercel --prod
```

Сохраните полученный URL (например: `https://alterra-vn.vercel.app`)

### Конфигурация для Vercel

Создайте `vercel.json` в корне проекта:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🌊 Netlify

### Преимущества:
- ✅ Drag-and-drop деплой
- ✅ Бесплатный SSL
- ✅ Встроенные формы и функции

### Шаги:

#### 1. Через веб-интерфейс

1. Зайдите на [netlify.com](https://netlify.com)
2. Нажмите "Add new site" → "Deploy manually"
3. Перетащите папку `dist/`
4. Сохраните URL

#### 2. Через CLI

```bash
# Установка
npm install -g netlify-cli

# Логин
netlify login

# Инициализация
netlify init

# Деплой
netlify deploy --prod
```

### Конфигурация для Netlify

Создайте `netlify.toml` в корне проекта:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🐙 GitHub Pages

### Шаги:

#### 1. Установка gh-pages
```bash
npm install --save-dev gh-pages
```

#### 2. Добавьте в package.json
```json
{
  "scripts": {
    "deploy:gh": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://username.github.io/alterra-vn"
}
```

#### 3. Настройте vite.config.js
```javascript
export default defineConfig({
  base: '/alterra-vn/',
  // ... rest of config
})
```

#### 4. Деплой
```bash
npm run deploy:gh
```

URL будет: `https://username.github.io/alterra-vn`

## 🤖 Настройка Telegram Bot

После деплоя на любую из платформ:

### 1. Зарегистрируйте Mini App

В [@BotFather](https://t.me/BotFather):

```
/newapp
```

Выберите вашего бота и заполните:
- **Title:** Alterra
- **Description:** Визуальные новеллы нового поколения, где ваш выбор создаёт реальность
- **Short name:** alterra (используется в URL)
- **Photo:** Загрузите логотип 640×360
- **Web App URL:** Ваш URL с деплоя (например, `https://alterra-vn.vercel.app`)

### 2. Получите ссылку Mini App

После создания получите ссылку вида:
```
https://t.me/YOUR_BOT_USERNAME/alterra
```

### 3. Проверьте работу

Откройте ссылку в Telegram и проверьте:
- ✅ Приложение загружается
- ✅ Отображаются все ресурсы (картинки, стили)
- ✅ Работает навигация
- ✅ Сохраняется прогресс

## 🔧 Переменные окружения

Для production настройте переменные окружения в вашей платформе:

### Vercel:
```bash
vercel env add VITE_TELEGRAM_BOT_TOKEN
vercel env add VITE_AI_API_KEY
# и т.д.
```

### Netlify:
Site settings → Environment variables → Add variable

## 📱 Тестирование

### 1. Локальное тестирование в Telegram

Используйте ngrok для туннеля:
```bash
npm install -g ngrok
npm run dev  # В одном терминале
ngrok http 5173  # В другом
```

Используйте ngrok URL в BotFather для тестирования.

### 2. Desktop Telegram

Telegram Desktop поддерживает WebApp, удобно для разработки:
- Включите Developer Tools (Ctrl+Shift+I)
- Проверяйте console на ошибки

### 3. Mobile тестирование

Обязательно тестируйте на реальных устройствах:
- iOS (iPhone)
- Android
- Разные размеры экранов

## ⚡ Оптимизация

### 1. Сжатие изображений

```bash
# Установите sharp
npm install -g sharp-cli

# Оптимизируйте изображения
sharp -i src/assets/**/*.{jpg,png} -o dist/assets/ --resize 1920 --quality 85
```

### 2. Lazy loading

Убедитесь, что большие ресурсы загружаются лениво:
```javascript
const BigComponent = lazy(() => import('./BigComponent'));
```

### 3. Code splitting

Vite автоматически делает code splitting, но проверьте размеры чанков:
```bash
npm run build -- --report
```

## 🔒 Безопасность

### 1. Валидация Telegram Data

На backend ОБЯЗАТЕЛЬНО проверяйте initData:

```javascript
const crypto = require('crypto');

function validateTelegramWebAppData(data, botToken) {
  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
    
  const dataCheckString = Object.keys(data)
    .filter(key => key !== 'hash')
    .map(key => `${key}=${data[key]}`)
    .sort()
    .join('\n');
    
  const hash = crypto
    .createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');
    
  return hash === data.hash;
}
```

### 2. HTTPS обязателен

Telegram требует HTTPS для Mini Apps. Все перечисленные платформы предоставляют его бесплатно.

### 3. CSP заголовки

Настройте Content Security Policy в `vercel.json` или `netlify.toml`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

## 📊 Мониторинг

### 1. Error tracking

Рекомендуется интегрировать:
- Sentry
- LogRocket  
- Bugsnag

### 2. Analytics

- Google Analytics 4
- Amplitude
- Mixpanel

### 3. Performance

- Lighthouse CI
- WebPageTest
- Telegram WebApp метрики

## 🆘 Troubleshooting

### Проблема: "Failed to load resource"
**Решение:** Проверьте пути к ресурсам. В Vite используйте относительные пути или импорты.

### Проблема: "Mixed Content"
**Решение:** Все ресурсы должны загружаться через HTTPS.

### Проблема: "WebApp not found"
**Решение:** 
- Проверьте URL в BotFather
- Убедитесь что деплой завершился успешно
- Проверьте что index.html доступен по root path

### Проблема: Белый экран
**Решение:**
- Проверьте console в DevTools
- Убедитесь что base URL в vite.config правильный
- Проверьте что все assets скопировались в dist/

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте [FAQ](FAQ.md)
2. Создайте Issue на GitHub
3. Напишите в [@alterra_support](https://t.me/alterra_support)

---

**Успешного деплоя! 🚀**


