# 🤖 Telegram Bot Setup Guide

## Проблемы и решения

### ❌ Проблема 1: Broken images в Vercel
**Причина:** Vite import images находятся в `src/assets`, но Vercel serve только из `public/`

**Решение:** ✅ Исправлено - теперь используем `/assets/` paths из `public/`

### ❌ Проблема 2: Vercel требует login
**Причина:** URL вида `vn-e3uqbpti7-jordy-20035s-projects.vercel.app` - это preview deployment, требует авторизации

**Решение:** Нужно использовать production domain

### ❌ Проблема 3: Пустой бот без меню
**Причина:** Бот не настроен с командами и описанием

**Решение:** Настроить через BotFather

---

## 🔧 Полное исправление

### Шаг 1: Настройка Vercel Production Domain

1. **Зайдите в Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Выберите ваш проект

2. **Настройте Production Domain:**
   ```
   Settings → Domains → Add Domain
   ```
   
   Опции:
   - **Бесплатный Vercel домен:**  
     `alterra-vn.vercel.app` (вместо длинного preview URL)
   
   - **Свой домен (опционально):**  
     `alterra.vn` или `app.alterra.vn`

3. **Промоутить текущий деплой в Production:**
   ```bash
   vercel --prod
   ```

### Шаг 2: Настройка бота через BotFather

Откройте [@BotFather](https://t.me/BotFather) и выполните:

#### 1. Установить описание бота
```
/setdescription
```
Выберите `@alterrrabot`, затем отправьте:
```
🎮 Alterra - визуальные новеллы нового поколения!

Твой выбор создаёт новую реальность. Играй в интерактивные истории, где каждое решение имеет значение.

✨ Свободные действия с AI
💎 Система характеристик
🎭 Множество концовок

Нажми /start чтобы начать!
```

#### 2. Установить краткое описание
```
/setabouttext
```
Выберите `@alterrrabot`, затем:
```
Интерактивные визуальные новеллы с AI. Твой выбор создаёт реальность!
```

#### 3. Добавить команды бота
```
/setcommands
```
Выберите `@alterrrabot`, затем отправьте:
```
start - 🎮 Начать игру
help - ℹ️ Помощь
shop - 💎 Магазин
profile - 👤 Мой профиль
catalog - 📚 Каталог историй
```

#### 4. Настроить кнопку меню
```
/setmenubutton
```
Выберите `@alterrrabot`, затем:
- Нажмите "Edit Menu Button URL"
- Введите URL: `https://alterra-vn.vercel.app` (ваш production URL)
- Введите текст кнопки: "🎮 Играть в Alterra"

#### 5. Добавить изображение бота (опционально)
```
/setuserpic
```
Загрузите красивую аватарку (512×512px)

### Шаг 3: Обновить Mini App URL

```
/myapps
```
Выберите вашего бота → Выберите приложение "alterra" → Edit → Web App URL

Введите ваш **production URL**:
```
https://alterra-vn.vercel.app
```

### Шаг 4: Создать Welcome Message (автоответ на /start)

В настройках бота создайте обработчик команды `/start`, который будет:

1. **Показывать inline кнопку для запуска Mini App**
2. **Отправлять приветственное сообщение**

Так как у вас простой бот без backend, используйте @BotFather для базовой настройки:

```
/setcommands
```

Но для полноценного welcome message нужен простой backend. Вот быстрое решение:

---

## 🚀 Быстрое решение: Использовать Menu Button

Вместо сложного backend, настройте **Menu Button** (кнопка внизу рядом с полем ввода):

### В BotFather:
```
/setmenubutton
```

Это добавит красивую кнопку "🎮 Играть в Alterra" в интерфейс бота!

---

## 📱 Правильные ссылки после настройки

После выполнения всех шагов:

- **Бот:** https://t.me/alterrrabot
- **Mini App (прямая ссылка):** https://t.me/alterrrabot/alterra
- **Web версия:** https://alterra-vn.vercel.app

### Что увидит пользователь:

1. **Открывает бота** → Видит описание и кнопку "🎮 Играть в Alterra"
2. **Нажимает кнопку** → Открывается Mini App без login!
3. **Играет** → Все работает, картинки загружаются ✅

---

## 🔍 Проверка после настройки

### ✅ Чеклист:
- [ ] Vercel деплой на production URL (не preview)
- [ ] Картинки доступны по `/assets/...`
- [ ] BotFather: установлен description
- [ ] BotFather: настроены команды
- [ ] BotFather: установлен menu button
- [ ] Mini App URL обновлен на production
- [ ] Бот открывается без login ✅

---

## 💡 Альтернативное решение: Простой backend для бота

Если хотите полный контроль, создайте простой backend:

### Используя Vercel Serverless Functions:

**Файл:** `api/telegram.js`
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  if (message?.text === '/start') {
    const chatId = message.chat.id;
    
    // Отправить приветственное сообщение с кнопкой
    const response = {
      method: 'sendMessage',
      chat_id: chatId,
      text: '🎮 Добро пожаловать в Alterra!\n\nТвой выбор создаёт новую реальность.\n\nНачни своё приключение прямо сейчас! 👇',
      reply_markup: {
        inline_keyboard: [[
          {
            text: '✨ Играть в Alterra',
            web_app: { url: 'https://alterra-vn.vercel.app' }
          }
        ]]
      }
    };

    // Отправить в Telegram API
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response)
    });
  }

  res.status(200).json({ ok: true });
}
```

**Настройка webhook в BotFather:**
```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -d "url=https://alterra-vn.vercel.app/api/telegram"
```

---

## 🎯 Итоговая структура

```
Пользователь
    ↓
[Telegram Bot @alterrrabot]
    ↓
Нажимает "🎮 Играть в Alterra" (Menu Button)
    ↓
[Mini App открывается]
    ↓
https://alterra-vn.vercel.app
    ↓
Все картинки загружаются из /assets/ ✅
    ↓
Игра работает! 🎉
```

---

## ❓ Частые проблемы

### Проблема: "Vercel login required"
**Решение:** Используйте production URL (не preview URL)
```bash
vercel --prod
```

### Проблема: "Images not loading"
**Решение:** Проверьте что assets скопированы в `public/assets/`
```bash
# Скопируйте assets
cp -r src/assets/* public/assets/
# Или на Windows
xcopy /E /I /Y src\assets public\assets
```

### Проблема: "Bot has no menu"
**Решение:** Настройте menu button через BotFather:
```
/setmenubutton
```

---

## 📞 Поддержка

Если что-то не работает:
1. Проверьте Vercel Deployment Logs
2. Проверьте Telegram Bot API logs
3. Проверьте DevTools Console в браузере
4. Напишите: manyejordana@gmail.com

---

**Готово! Ваш бот теперь работает профессионально! 🚀**


