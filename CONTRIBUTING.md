# 🤝 Contributing to Alterra

Спасибо за интерес к проекту Alterra! Мы рады любому вкладу.

## 📋 Содержание

- [Кодекс поведения](#кодекс-поведения)
- [Как я могу помочь?](#как-я-могу-помочь)
- [Процесс разработки](#процесс-разработки)
- [Стайлгайд](#стайлгайд)
- [Создание историй](#создание-историй)

## 🤗 Кодекс поведения

Мы придерживаемся принципов уважения и включенности. Пожалуйста:
- Будьте дружелюбны и конструктивны
- Уважайте разные мнения
- Фокусируйтесь на том, что лучше для сообщества
- Проявляйте эмпатию к другим участникам

## 💡 Как я могу помочь?

### Разработка
- Исправление багов
- Добавление новых функций
- Улучшение производительности
- Написание тестов
- Улучшение документации

### Контент
- Создание новых историй
- Написание диалогов
- Дизайн персонажей
- Создание фоновых изображений
- Перевод на другие языки

### Дизайн
- UI/UX улучшения
- Иконки и иллюстрации
- Анимации
- Звуковое оформление

## 🔨 Процесс разработки

### 1. Fork и Clone

```bash
# Fork репозиторий на GitHub, затем:
git clone https://github.com/YOUR_USERNAME/alterra-vn.git
cd alterra-vn
npm install
```

### 2. Создайте ветку

```bash
git checkout -b feature/my-amazing-feature
# или
git checkout -b fix/bug-description
```

Именование веток:
- `feature/` - новые функции
- `fix/` - исправления багов
- `docs/` - изменения в документации
- `refactor/` - рефакторинг кода
- `style/` - стилистические изменения

### 3. Внесите изменения

- Следуйте стайлгайду (см. ниже)
- Пишите понятные commit messages
- Добавляйте комментарии где нужно
- Обновляйте документацию при необходимости

### 4. Тестируйте

```bash
# Запустите dev сервер
npm run dev

# Проверьте линтер
npm run lint

# Создайте production build
npm run build
```

Проверьте:
- ✅ Приложение работает без ошибок
- ✅ Нет console errors
- ✅ Код проходит линтер
- ✅ Build успешно собирается

### 5. Commit

Используйте понятные commit messages:

```bash
git commit -m "feat: add new character sprite system"
git commit -m "fix: resolve energy timer display bug"
git commit -m "docs: update deployment guide"
```

Формат:
- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование, пропущенные точки с запятой и т.д.
- `refactor:` - рефакторинг кода
- `test:` - добавление тестов
- `chore:` - обновление зависимостей и т.д.

### 6. Push и Pull Request

```bash
git push origin feature/my-amazing-feature
```

Затем на GitHub:
1. Откройте Pull Request
2. Опишите что вы изменили и зачем
3. Прикрепите скриншоты если это UI изменения
4. Укажите связанные Issues (#123)

### Шаблон PR:

```markdown
## Описание
Краткое описание ваших изменений

## Тип изменения
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Как протестировано?
Опишите как вы тестировали изменения

## Скриншоты (если применимо)
Добавьте скриншоты

## Checklist
- [ ] Код следует стайлгайду
- [ ] Нет lint ошибок
- [ ] Добавлены комментарии где нужно
- [ ] Обновлена документация
- [ ] Build успешно собирается
```

## 📝 Стайлгайд

### JavaScript/React

#### Именование

```javascript
// Компоненты - PascalCase
function SceneViewer() {}

// Функции и переменные - camelCase
const handleClick = () => {}
const userName = 'Anna'

// Константы - UPPER_SNAKE_CASE
const ENERGY_MAX = 4
const API_ENDPOINT = 'https://api.example.com'

// Private переменные - _camelCase
const _internalState = {}
```

#### Структура компонентов

```javascript
import React, { useState, useEffect } from 'react';
import { useCustomHook } from '../hooks/useCustomHook';
import ComponentA from './ComponentA';
import './styles.css';

/**
 * ComponentName - краткое описание
 * @param {Object} props - описание props
 */
export default function ComponentName({ prop1, prop2 }) {
  // 1. Хуки состояния
  const [state, setState] = useState(null);
  
  // 2. Custom hooks
  const { data } = useCustomHook();
  
  // 3. useEffect
  useEffect(() => {
    // effect logic
  }, []);
  
  // 4. Обработчики событий
  const handleClick = () => {
    // handler logic
  };
  
  // 5. Вспомогательные функции
  const helperFunction = () => {
    // helper logic
  };
  
  // 6. Early returns
  if (!data) return <Loading />;
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

#### Стилизация

Предпочтительно использовать:
1. CSS классы из index.css
2. Inline styles для динамических значений
3. Избегайте styled-components (для консистентности)

```javascript
// ✅ Хорошо
<div className="story-card" style={{ opacity: isLoading ? 0.5 : 1 }}>

// ❌ Плохо
<div style={{ padding: '12px', borderRadius: '8px', ... }}>
```

### CSS

```css
/* Используйте kebab-case для классов */
.story-card {}
.story-card-title {}

/* Избегайте вложенности глубже 3 уровней */
.parent .child .grandchild {} /* максимум */

/* Используйте CSS переменные для цветов */
:root {
  --primary-color: #667eea;
  --text-color: #111;
}

.button {
  background: var(--primary-color);
}
```

### Комментарии

```javascript
// ✅ Хорошо - объясняет "почему"
// Calculate energy regen time because Telegram API doesn't persist timers
const regenTime = Date.now() - lastRegen;

// ❌ Плохо - объясняет "что" (очевидно из кода)
// Set energy to previous energy plus 1
setEnergy(energy + 1);
```

## 📖 Создание историй

### Структура истории

1. **Планирование:**
   - Определите тему и жанр
   - Создайте главных персонажей
   - Набросайте основной сюжет
   - Определите ключевые развилки

2. **Создание файла истории:**

В `src/data/stories.json`:
```json
{
  "id": "story_your_id",
  "title": "Название вашей истории",
  "cover": "/src/assets/your-cover.png",
  "annotation": "Описание...",
  "episodesCount": 10,
  "locked": false,
  "startSceneId": "your_scene_001"
}
```

3. **Создание сцен:**

В `src/data/scenes.json`:
```json
{
  "your_scene_001": {
    "id": "your_scene_001",
    "title": "Название сцены",
    "image": "/assets/background.jpg",
    "speaker": "Персонаж",
    "text": "Текст диалога...",
    "choices": [
      {
        "id": "choice_1",
        "label": "Текст выбора",
        "goto": "your_scene_002",
        "effects": { "honesty": 1 }
      }
    ]
  }
}
```

### Советы по написанию

1. **Диалоги:**
   - Держите их короткими (2-3 предложения)
   - Показывайте эмоции через описания
   - Используйте характерную речь для персонажей

2. **Выборы:**
   - Минимум 2, максимум 4 варианта
   - Каждый выбор должен иметь последствия
   - Добавляйте "свободное действие" для креативности

3. **Баланс статов:**
   - Не делайте резких изменений (+/- 5 макс за выбор)
   - Разные пути должны иметь разный баланс статов
   - Учитывайте последствия для будущих выборов

4. **Ветвление:**
   - Планируйте 3-5 основных веток
   - Используйте "bottleneck" сцены для слияния веток
   - Не бойтесь делать тупиковые ветки (bad endings)

## 🎨 Стандарты для ресурсов

### Изображения

**Обложки историй:**
- Формат: PNG или JPG
- Размер: 800×1200px (3:4)
- Вес: < 500KB

**Фоны локаций:**
- Формат: JPG
- Размер: 1920×1080px (16:9)
- Вес: < 300KB

**Спрайты персонажей:**
- Формат: PNG с прозрачностью
- Высота: 1200-1500px
- Вес: < 200KB

### Аудио

**Музыка:**
- Формат: MP3
- Битрейт: 128kbps
- Длина: loop 1-2 минуты

**Звуковые эффекты:**
- Формат: MP3
- Битрейт: 96kbps
- Длина: < 5 секунд

## ❓ Вопросы?

- Создайте [Issue](https://github.com/alterra-vn/issues)
- Напишите в [Discord](https://discord.gg/alterra)
- Email: contribute@alterra.vn

## 📜 Лицензия

Внося вклад, вы соглашаетесь что ваш код будет лицензирован под MIT License.

---

**Спасибо за вклад в Alterra! 🚀**


