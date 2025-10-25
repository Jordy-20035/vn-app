# ⚡ ПЕРЕЗАПУСК DEV СЕРВЕРА - ВАЖНО!

## 🔴 ПРОБЛЕМА:

Вы создали `.env.local` файл, но **Vite ещё не загрузил** его, потому что сервер был запущен **ДО** создания файла!

**Vite загружает `.env.local` ТОЛЬКО при старте сервера!**

---

## ✅ РЕШЕНИЕ:

### Шаг 1: Остановите сервер

В терминале где запущен `npm run dev`:

**Нажмите:** `Ctrl + C`

Вы увидите:
```
^C
Terminated
```

---

### Шаг 2: Перезапустите сервер

```bash
npm run dev
```

Должно показать:
```
> alterra-vn-app@1.0.0 dev
> vite

  VITE v7.1.11  ready in 340 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

---

### Шаг 3: Откройте браузер

```
http://localhost:5174/
```

(или 5173 если порт освободился)

---

### Шаг 4: Откройте DevTools Console

**Нажмите:** `F12` → вкладка **Console**

---

## 🎯 ЧТО ВЫ ДОЛЖНЫ УВИДЕТЬ:

### ✅ ПРАВИЛЬНЫЙ ВЫВОД:

```javascript
=== ALTERRA INITIALIZATION ===
Environment: development
YandexGPT API Key present: true
YandexGPT Folder ID present: true
API Key length: 48
Folder ID: b1g13ksmlceq989m9qrp
==============================

YandexGPT Config: {
  hasApiKey: true,
  hasFolderId: true,
  folderIdLength: 20
}

[Telegram.WebView] > postEvent web_app_ready
[Telegram.WebView] > postEvent web_app_expand
...
```

### ❌ НЕПРАВИЛЬНЫЙ ВЫВОД:

Если видите:
```javascript
YandexGPT API Key present: false
YandexGPT Folder ID present: false
API Key length: 0
Folder ID: NOT SET
```

**Значит `.env.local` всё ещё не загружен!**

---

## 🐛 ЕСЛИ НЕ РАБОТАЕТ ПОСЛЕ ПЕРЕЗАПУСКА:

### Проверка 1: Файл существует?

```bash
# В терминале проекта
type .env.local
```

Должно показать:
```
VITE_YANDEX_API_KEY=AQVNyO0XxGnTaNecjcnHVQh_92B7swE0TWn2re2B
VITE_YANDEX_FOLDER_ID=b1g13ksmlceq989m9qrp
...
```

### Проверка 2: Файл в правильной папке?

`.env.local` должен быть **В КОРНЕ проекта**, рядом с:
- `package.json` ✅
- `vite.config.js` ✅
- `src/` папка ✅

**НЕ ВНУТРИ `src/`!**

### Проверка 3: Имя файла правильное?

- ✅ `.env.local` (с точкой в начале!)
- ❌ `env.local` (без точки)
- ❌ `.env.local.txt` (с расширением)

**Windows может скрывать расширения!**

В Explorer:
1. Вид → Показать → Расширения имён файлов ✓
2. Проверьте что файл именно `.env.local`, а не `.env.local.txt`

---

## 💡 ПОЧЕМУ ТАК?

### Как работает Vite с .env:

```
1. Запуск npm run dev
   ↓
2. Vite читает .env.local ОДИН РАЗ
   ↓
3. Загружает переменные в import.meta.env
   ↓
4. Сервер работает с этими переменными
```

**Изменения в `.env.local` ПОСЛЕ запуска НЕ применяются!**

**Нужен перезапуск!**

---

## 🎯 CHECKLIST:

- [ ] Остановил сервер (Ctrl+C)
- [ ] Проверил что `.env.local` в корне проекта
- [ ] Проверил содержимое (`type .env.local`)
- [ ] Перезапустил сервер (`npm run dev`)
- [ ] Открыл браузер (http://localhost:5174/)
- [ ] Открыл Console (F12)
- [ ] Вижу "ALTERRA INITIALIZATION" с `true` значениями
- [ ] Вижу "YandexGPT Config" с `hasApiKey: true`

---

## ✅ ПОСЛЕ УСПЕШНОГО ПЕРЕЗАПУСКА:

Если видите правильные логи → **AI готов к работе!**

**Протестируйте:**
1. Запустите историю
2. Нажмите "✨ Свободное действие..."
3. Введите: "попросить кофе у секретаря"
4. Нажмите "Отправить"
5. Подождите 3-5 секунд
6. **AI ОТВЕТИТ!** 🎉

---

## 📞 ЕСЛИ ВСЁ ЕЩЁ НЕ РАБОТАЕТ:

Пришлите мне:
1. Screenshot консоли с логами
2. Вывод команды `type .env.local`
3. Вывод команды `dir` (в корне проекта)

---

**Перезапустите сервер прямо сейчас! 🚀**

