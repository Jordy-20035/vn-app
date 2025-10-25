# 🚨 КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ

## 1. ❌ AI НЕ РАБОТАЕТ - НУЖНЫ ENVIRONMENT VARIABLES!

### Проблема:
В Telegram боте показывается: **"В финальной версии AI обработает ваш выбор"**
Это значит, что YandexGPT API не подключён!

### Решение:
1. Зайдите в Vercel: https://vercel.com/jordy-20035s-projects/vn-app/settings/environment-variables
2. Добавьте эти 2 переменные:

```
Name: VITE_YANDEX_API_KEY
Value: AQVNyO0XxGnTaNecjcnHVQh_92B7swE0TWn2re2B

Name: VITE_YANDEX_FOLDER_ID
Value: b1g13ksmlceq989m9qrp
```

3. После добавления переменных, нажмите **Redeploy** в Vercel
4. Или выполните:
```bash
vercel --prod
```

### Как проверить, что работает:
После редеплоя, в боте:
1. Нажмите "✨ Свободное действие..."
2. Введите действие (например: "попросить кофе")
3. Должен появиться **реальный ответ от AI**, а не "В финальной версии..."

---

## 2. 📖 МАЛО СЦЕН - НУЖНО ПРОДОЛЖЕНИЕ ИСТОРИИ

### Текущая ситуация:
Сейчас только **7 сцен**:
- scene_001: Вход в агентство
- scene_002: Разговор с секретарём
- scene_003: Проход мимо секретаря
- scene_004: Взятка секретарю
- scene_005: Офис директора
- scene_006: Разговор с директором
- scene_007: Конец эпизода (**игра заканчивается**)

### Что нужно от лидера проекта:

#### А) Продолжение сюжета:
Нужно минимум **15-20 сцен** для первого эпизода. Для каждой сцены:

```json
{
  "scene_008": {
    "id": "scene_008",
    "title": "Название сцены",
    "image": "/assets/backgrounds/image.jpg",
    "speaker": "Имя говорящего",
    "text": "Текст сцены (2-4 предложения)",
    "characters": [
      {
        "id": "anna",
        "image": "/assets/characters/anna-neutral.png",
        "x": "5%",
        "y": "0",
        "scale": 1.0
      }
    ],
    "choices": [
      {
        "id": "choice_1",
        "label": "Текст выбора",
        "goto": "scene_009",
        "effects": { "honesty": 1 }
      },
      {
        "id": "choice_2",
        "label": "Другой выбор",
        "goto": "scene_010",
        "effects": { "cunning": 1 }
      },
      {
        "id": "free_action",
        "label": "✨ Свободное действие...",
        "free": true
      }
    ],
    "meta": { "locId": "location_name" }
  }
}
```

#### Б) Лор первой истории:

Файл: `src/data/lore/story1-lore.json`
```json
{
  "storyId": "story_001",
  "title": "Название истории",
  "setting": "Описание мира и обстановки",
  "timePeriod": "Временной период",
  "mainConflict": "Главный конфликт",
  "plotSummary": "Краткое описание сюжета первого эпизода",
  "locations": [
    {
      "id": "agency_lobby",
      "name": "Приёмная агентства",
      "description": "Описание локации"
    }
  ]
}
```

#### В) Информация о персонажах:

Для КАЖДОГО персонажа в истории нужно:

```json
{
  "characterId": "anna",
  "name": "Анна Майер",
  "role": "Главная героиня",
  "personality": "2-3 предложения о характере",
  "appearance": "Внешность",
  "backstory": "Предыстория",
  "sprites": {
    "neutral": "/assets/characters/anna-neutral.png",
    "happy": "/assets/characters/anna-happy.png",
    "sad": "/assets/characters/anna-sad.png",
    "angry": "/assets/characters/anna-angry.png"
  },
  "defaultSprite": "neutral"
}
```

#### Г) Готовые спрайты:

**Формат:** PNG с прозрачностью
**Размер:** Рекомендуется 1024x2048px (высота больше ширины)
**Именование:** `имя-эмоция.png`

Примеры:
- `anna-neutral.png`
- `anna-happy.png`
- `anna-sad.png`
- `secretary-neutral.png`
- `secretary-smile.png`
- `director-neutral.png`

Загрузить в: `public/assets/characters/`

---

## 3. 🎭 ПЕРСОНАЖИ НЕ ВИДНЫ В TELEGRAM БОТЕ

### Возможные причины:

#### A) Проблема с мобильной версткой
Персонажи могут быть за пределами экрана на телефоне.

#### B) Изображения слишком большие
Telegram WebView может не загружать очень большие PNG.

#### C) CSS проблемы на мобильных устройствах

### Решения:

#### Временное решение - добавить отладочную информацию:

Я добавлю видимый индикатор, показывающий, загрузились ли персонажи.

#### Оптимальное решение - оптимизировать спрайты:
1. Сжать PNG файлы (TinyPNG.com)
2. Убедиться, что размер каждого файла < 500KB
3. Использовать размер 800x1600px вместо больших разрешений

---

## 4. ✅ ЧТО РАБОТАЕТ СЕЙЧАС:

- ✅ Dual currency system (Energy + Diamonds)
- ✅ Stat tracking (Honesty, Cunning, Reputation, Charm)
- ✅ Story catalog UI
- ✅ Scene viewer with choices
- ✅ Free action modal (UI)
- ✅ Character positioning (на десктопе)
- ✅ Vercel deployment
- ✅ YandexGPT integration code (нужны переменные!)

---

## 5. 🎯 ПРИОРИТЕТНЫЕ ДЕЙСТВИЯ (ПРЯМО СЕЙЧАС):

### 1️⃣ **СРОЧНО - Установить environment variables:**
```
Vercel → Project Settings → Environment Variables
+ Add New
Name: VITE_YANDEX_API_KEY
Value: AQVNyO0XxGnTaNecjcnHVQh_92B7swE0TWn2re2B

+ Add New
Name: VITE_YANDEX_FOLDER_ID
Value: b1g13ksmlceq989m9qrp

→ Redeploy
```

### 2️⃣ **Получить от лидера:**
- [ ] Продолжение сцен (scene_008 - scene_025)
- [ ] Лор истории
- [ ] Описания всех персонажей
- [ ] Список доступных спрайтов

### 3️⃣ **Загрузить спрайты:**
Дайте мне доступ к GitHub репозиторию со спрайтами, я их добавлю в проект.

### 4️⃣ **Отладить мобильную версию:**
После получения спрайтов, протестируем на телефоне и исправим позиционирование.

---

## 📞 СЛЕДУЮЩИЕ ШАГИ:

1. **ВЫ:** Установите environment variables в Vercel
2. **ВЫ:** Получите от лидера контент (сцены, лор, персонажи)
3. **ВЫ:** Дайте мне доступ к GitHub со спрайтами
4. **Я:** Добавлю контент в проект
5. **Я:** Исправлю отображение персонажей на мобильных
6. **МЫ:** Протестируем в Telegram боте
7. **МЫ:** Подготовим презентацию для хакатона

---

## ⚡ БЫСТРАЯ ПРОВЕРКА:

После установки environment variables, проверьте в боте:

**Тест 1: AI работает?**
1. Откройте бот
2. Начните игру
3. Нажмите "✨ Свободное действие..."
4. Введите: "улыбнуться секретарю"
5. Должен появиться AI-ответ с деталями!

**Тест 2: Персонажи видны?**
1. Откройте бот на телефоне
2. Начните игру
3. Видны ли персонажи над диалоговым окном?
4. Если нет - сделайте скриншот и покажите мне

---

Готов помочь с любым из этих пунктов! 🚀

