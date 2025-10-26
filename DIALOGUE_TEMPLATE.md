# 📝 Шаблон для написания диалогов

## Новый формат сцены с пошаговыми диалогами

### Полный пример:

```json
{
  "scene_001": {
    "id": "scene_001",
    "title": "Название сцены (опционально)",
    "image": "/assets/backgrounds/фон.jpg",
    
    "dialogue": [
      {
        "speaker": "Анна",
        "text": "Текст реплики персонажа. 1-2 предложения.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-neutral.png",
          "x": "5%",
          "scale": 1.0
        }
      },
      {
        "speaker": "Секретарь",
        "text": "Ответ другого персонажа.",
        "character": {
          "id": "secretary",
          "image": "/assets/characters/sec-smile.png",
          "x": "55%",
          "scale": 1.0
        }
      },
      {
        "speaker": "Анна",
        "text": "Следующая реплика.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-happy.png",
          "x": "5%",
          "scale": 1.0
        }
      }
    ],
    
    "choices": [
      {
        "id": "choice_1",
        "label": "Текст выбора 1",
        "goto": "scene_002",
        "effects": { "honesty": 1 }
      },
      {
        "id": "choice_2",
        "label": "Текст выбора 2",
        "goto": "scene_003",
        "effects": { "cunning": 1 }
      },
      {
        "id": "free_action",
        "label": "✨ Свободное действие...",
        "free": true
      }
    ],
    
    "meta": { "locId": "имя_локации" }
  }
}
```

---

## Подробное описание полей:

### 1. **Базовая информация сцены:**

```json
"id": "scene_001",           // Уникальный ID сцены
"title": "Название сцены",   // Опционально, для legacy mode
"image": "/assets/backgrounds/фон.jpg"  // Фон сцены
```

---

### 2. **Массив dialogue (пошаговые реплики):**

Каждая реплика — это отдельный шаг диалога.

```json
"dialogue": [
  {
    "speaker": "Имя персонажа",       // Кто говорит
    "text": "Текст реплики",          // Что говорит (1-3 предложения)
    "character": {                    // Данные о персонаже
      "id": "anna",                   // ID персонажа
      "image": "/assets/characters/anna-neutral.png",  // Спрайт
      "x": "5%",                      // Позиция по горизонтали
      "scale": 1.0                    // Масштаб (опционально)
    }
  }
]
```

#### **Правила для dialogue:**

1. **Длина текста:** 1-3 предложения максимум
2. **Смена говорящего:** При смене `speaker` предыдущий персонаж исчезает
3. **Эмоции:** Меняйте спрайт (напр. `anna-neutral.png` → `anna-happy.png`) для отображения эмоций
4. **Порядок:** Реплики показываются по порядку, игрок кликает "Далее"
5. **Количество:** Рекомендуется 3-7 реплик на сцену

#### **Позиции персонажей:**
- **Левый персонаж:** `"x": "5%"` до `"x": "15%"`
- **Правый персонаж:** `"x": "50%"` до `"x": "60%"`
- **Центр:** `"x": "30%"` до `"x": "40%"` (для особых случаев)

---

### 3. **Choices (варианты выбора):**

Показываются **после** завершения всех реплик dialogue.

#### Обычный выбор:
```json
{
  "id": "choice_1",
  "label": "Текст кнопки",
  "goto": "scene_002",
  "effects": { "honesty": 1, "charm": 1 }
}
```

#### Платный выбор (за diamonds):
```json
{
  "id": "paid_choice",
  "label": "Особый выбор",
  "goto": "scene_special",
  "cost": 20,
  "effects": { "cunning": 2, "reputation": -1 }
}
```

#### Выбор с требованиями по статам:
```json
{
  "id": "stat_locked",
  "label": "Убедить директора (Обаяние ≥ 5)",
  "goto": "scene_success",
  "requiredStats": { "charm": 5 },
  "effects": { "reputation": 2 }
}
```

#### Свободное действие (AI):
```json
{
  "id": "free_action",
  "label": "✨ Свободное действие...",
  "free": true
}
```

---

## Краткий шаблон (копировать и заполнять):

```json
{
  "scene_XXX": {
    "id": "scene_XXX",
    "image": "/assets/backgrounds/ИМЯ.jpg",
    
    "dialogue": [
      {
        "speaker": "ИМЯ",
        "text": "ТЕКСТ",
        "character": {
          "id": "ID",
          "image": "/assets/characters/ID-ЭМОЦИЯ.png",
          "x": "5%"
        }
      }
    ],
    
    "choices": [
      {
        "id": "ID",
        "label": "ТЕКСТ",
        "goto": "scene_YYY",
        "effects": { "СТАТ": ЧИСЛО }
      },
      {
        "id": "free_action",
        "label": "✨ Свободное действие...",
        "free": true
      }
    ],
    
    "meta": { "locId": "ЛОКАЦИЯ" }
  }
}
```

---

## Примеры использования:

### Пример 1: Простая сцена с 2 репликами

```json
{
  "scene_greeting": {
    "id": "scene_greeting",
    "image": "/assets/backgrounds/office.jpg",
    
    "dialogue": [
      {
        "speaker": "Директор",
        "text": "Входите, садитесь. Чем могу помочь?",
        "character": {
          "id": "director",
          "image": "/assets/characters/director-neutral.png",
          "x": "75%"
        }
      },
      {
        "speaker": "Анна",
        "text": "Спасибо. У меня есть информация по делу.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-neutral.png",
          "x": "5%"
        }
      }
    ],
    
    "choices": [
      { "id": "show_docs", "label": "Показать документы", "goto": "scene_docs" },
      { "id": "explain", "label": "Рассказать устно", "goto": "scene_explain" }
    ]
  }
}
```

### Пример 2: Сцена с изменением эмоций

```json
{
  "scene_reaction": {
    "id": "scene_reaction",
    "image": "/assets/backgrounds/street.jpg",
    
    "dialogue": [
      {
        "speaker": "Анна",
        "text": "Я нашла её! Сестра жива!",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-happy.png",
          "x": "5%"
        }
      },
      {
        "speaker": "Напарник",
        "text": "Это... невероятно! Где она?",
        "character": {
          "id": "partner",
          "image": "/assets/characters/partner-surprised.png",
          "x": "75%"
        }
      },
      {
        "speaker": "Анна",
        "text": "В старом здании на окраине. Но там опасно.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-worried.png",
          "x": "5%"
        }
      }
    ],
    
    "choices": [
      { "id": "go_now", "label": "Идти немедленно", "goto": "scene_rescue", "effects": { "cunning": 1 } },
      { "id": "call_police", "label": "Вызвать полицию", "goto": "scene_police", "effects": { "honesty": 1 } },
      { "id": "free_action", "label": "✨ Свободное действие...", "free": true }
    ]
  }
}
```

### Пример 3: Монолог (только один персонаж)

```json
{
  "scene_thoughts": {
    "id": "scene_thoughts",
    "image": "/assets/backgrounds/night_city.jpg",
    
    "dialogue": [
      {
        "speaker": "Анна (мысли)",
        "text": "Что-то здесь не так. Слишком тихо.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-worried.png",
          "x": "45%"
        }
      },
      {
        "speaker": "Анна (мысли)",
        "text": "Нужно быть осторожной. Они могут следить.",
        "character": {
          "id": "anna",
          "image": "/assets/characters/anna-neutral.png",
          "x": "45%"
        }
      }
    ],
    
    "choices": [
      { "id": "investigate", "label": "Осмотреться", "goto": "scene_investigate" },
      { "id": "leave", "label": "Уйти", "goto": "scene_leave" }
    ]
  }
}
```

---

## Legacy Mode (старый формат):

Если не хотите использовать пошаговые диалоги, можно использовать старый формат:

```json
{
  "scene_old": {
    "id": "scene_old",
    "title": "Название",
    "image": "/assets/backgrounds/фон.jpg",
    "speaker": "Анна",
    "text": "Весь текст сцены отображается сразу.",
    "characters": [
      {
        "id": "anna",
        "image": "/assets/characters/anna-neutral.png",
        "x": "5%"
      },
      {
        "id": "secretary",
        "image": "/assets/characters/sec-neutral.png",
        "x": "75%"
      }
    ],
    "choices": [...]
  }
}
```

В legacy mode все персонажи показываются одновременно, текст отображается сразу весь.

---

## Рекомендации:

✅ **DO:**
- Держите реплики короткими (1-3 предложения)
- Меняйте спрайты для отображения эмоций
- Используйте 3-7 реплик на сцену
- Добавляйте свободное действие в каждой сцене

❌ **DON'T:**
- Не пишите длинные абзацы в одной реплике
- Не делайте слишком много реплик подряд (>10)
- Не забывайте менять спрайты при смене говорящего
- Не используйте одинаковые ID для разных сцен

---

## Чек-лист перед добавлением сцены:

- [ ] У сцены есть уникальный `id`
- [ ] Указан фон `image`
- [ ] В `dialogue` есть минимум 1 реплика
- [ ] У каждой реплики указан `speaker` и `text`
- [ ] У каждой реплики есть `character` с правильным путём к спрайту
- [ ] Есть минимум 2 варианта выбора в `choices`
- [ ] Каждый choice ведёт на существующую сцену (`goto`)
- [ ] Указан `meta.locId` для AI

---

**Готово! Используйте этот шаблон для создания сцен.** 🎭

