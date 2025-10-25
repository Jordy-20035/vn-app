# 🔑 Инструкция по настройке YandexGPT API

## 📋 Что мне нужно от вас:

### 1. **API Key** (Ключ API)

#### Как получить:
1. Зайдите в Yandex Cloud Console: https://console.cloud.yandex.ru
2. Выберите ваш каталог (folder)
3. Перейдите в **IAM** → **Сервисные аккаунты**
4. Создайте или выберите сервисный аккаунт
5. Нажмите **Создать API-ключ**
6. Скопируйте ключ (он показывается только один раз!)

**Формат:** `AQVN...` (длинная строка)

---

### 2. **Folder ID** (ID каталога)

#### Как получить:
1. В Yandex Cloud Console
2. Выберите ваш каталог
3. ID показан в URL: `https://console.cloud.yandex.ru/folders/{FOLDER_ID}`
4. Или в настройках каталога

**Формат:** `b1g...` (строка ~20 символов)

---

### 3. **Создайте файл с ключами:**

Создайте файл `.env.local` в корне проекта:

```bash
# YandexGPT Configuration
VITE_YANDEX_API_KEY=ваш_api_key_здесь
VITE_YANDEX_FOLDER_ID=ваш_folder_id_здесь
```

**⚠️ ВАЖНО:** 
- Файл `.env.local` НЕ загружать в Git (он в .gitignore)
- Это секретные данные!

---

## 🧪 Тестирование API

### Проверьте что API работает:

```bash
# В терминале (замените YOUR_API_KEY и YOUR_FOLDER_ID)
curl -X POST \
  https://llm.api.cloud.yandex.net/foundationModels/v1/completion \
  -H "Content-Type: application/json" \
  -H "Authorization: Api-Key YOUR_API_KEY" \
  -H "x-folder-id: YOUR_FOLDER_ID" \
  -d '{
    "modelUri": "gpt://YOUR_FOLDER_ID/yandexgpt-lite/latest",
    "completionOptions": {
      "stream": false,
      "temperature": 0.6,
      "maxTokens": 500
    },
    "messages": [
      {
        "role": "user",
        "text": "Привет! Как дела?"
      }
    ]
  }'
```

**Ожидаемый ответ:**
```json
{
  "result": {
    "alternatives": [
      {
        "message": {
          "role": "assistant",
          "text": "Привет! У меня всё хорошо, спасибо..."
        }
      }
    ]
  }
}
```

Если получили ответ → API работает! ✅

---

## 📊 Проверка баланса

Как проверить сколько осталось денег:

1. Yandex Cloud Console → **Биллинг**
2. Выберите платёжный аккаунт
3. Смотрите **Текущий баланс**

**Примерная стоимость:**
- YandexGPT Lite: ~0.4₽ за 1000 токенов
- Средний запрос: ~500-1000 токенов
- На 100₽ ≈ 200-400 запросов

---

## 🔧 После получения ключей:

### 1. Создайте `.env.local`:
```bash
VITE_YANDEX_API_KEY=ваш_ключ
VITE_YANDEX_FOLDER_ID=ваш_folder_id
```

### 2. Перезапустите dev сервер:
```bash
npm run dev
```

### 3. Проверьте в консоли:
Откройте DevTools → Console
Должно быть: "YandexGPT configured" ✅

---

## ⚠️ Безопасность

### НЕ ДЕЛАЙТЕ:
- ❌ Не коммитьте `.env.local` в Git
- ❌ Не делитесь ключами в Telegram/Discord
- ❌ Не показывайте ключи на скриншотах

### ДЕЛАЙТЕ:
- ✅ Храните ключи в `.env.local`
- ✅ Добавьте `.env.local` в `.gitignore`
- ✅ Используйте разные ключи для dev/prod

---

## 📞 Если что-то не работает:

### Ошибка 401 (Unauthorized)
→ Неверный API Key, проверьте ключ

### Ошибка 403 (Forbidden)
→ Неверный Folder ID, проверьте ID каталога

### Ошибка 429 (Too Many Requests)
→ Превышен лимит запросов, подождите или пополните баланс

### Ошибка 500
→ Проблема на стороне Yandex, попробуйте позже

---

## ✅ Чек-лист готовности:

- [ ] API Key получен
- [ ] Folder ID получен
- [ ] Файл `.env.local` создан с ключами
- [ ] Тестовый запрос curl отработал успешно
- [ ] Dev сервер перезапущен
- [ ] В консоли нет ошибок
- [ ] Баланс на аккаунте проверен

---

**После выполнения всех шагов → напишите мне "API готов" и я интегрирую YandexGPT в приложение! 🚀**

