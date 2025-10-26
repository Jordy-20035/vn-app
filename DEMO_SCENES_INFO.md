# 🎭 Demo Scenes - Quick Preview Guide

## What Was Created

5 demo scenes showcasing the **dialogue system** with typewriter effects and character animations, using only your existing placeholder assets.

## How to Access

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **In the story catalog**, look for:
   - **🎭 ДЕМО: Офисные интриги**
   - This is the first story in your catalog

3. **Click on it** and start the episode "Демо: Первый день"

## What's Included

### 5 Interactive Scenes

#### **Scene 1: Утро в офисе** (Morning at the Office)
- 4 dialogue lines between Anna and Secretary
- 3 choice types: normal, demanding, and paid (20 diamonds)
- Characters: Anna (neutral) & Secretary (smiling, neutral)

#### **Scene 2: Подготовка к встрече** (Preparing for Meeting)
- 3 dialogue lines
- Anna's emotion changes from neutral → happy
- Choices about how to prepare

#### **Scene 3: Конфронтация** (Confrontation)
- 4 dialogue lines
- Secretary reveals confidential information
- Includes a **stat-locked choice** (requires Cunning ≥ 3)

#### **Scene 4: Неожиданный поворот** (Unexpected Turn)
- 4 dialogue lines
- Drama unfolds as director discovers the conversation
- Includes a **stat-locked choice** (requires Charm ≥ 5)

#### **Scene 5: Встреча с клиентом** (Meeting with Client)
- 5 dialogue lines
- Final scene with multiple approaches
- Paid choice (30 diamonds) for manipulation route
- Leads to episode summary

## Features Demonstrated

✅ **Typewriter Effect** - Text appears letter by letter (80ms per character)
✅ **Character Animations** - Fade in/out transitions
✅ **Emotion Changes** - Characters change sprites mid-scene
✅ **Progress Indicator** - Shows current line / total lines
✅ **Multiple Choice Types:**
  - 🆓 Free choices (normal)
  - 💎 Paid choices (require diamonds)
  - 🔒 Stat-locked choices (require specific stats)
  - ✨ AI free actions (requires YandexGPT setup)

## Assets Used

All scenes use only existing placeholders:

### Backgrounds:
- `/assets/backgrounds/agency_lobby.jpg`
- `/assets/backgrounds/office_interior.jpg`
- `/assets/backgrounds/office_desk.jpg`

### Characters:
- `/assets/characters/anna-neutral.png`
- `/assets/characters/anna-happy.png`
- `/assets/characters/sec-neutral.png`
- `/assets/characters/sec-smile.png`

## For Your Artistic Team

When your team creates new assets, simply:

1. Replace the image paths in `src/data/scenes.json`
2. Follow this naming convention:
   ```
   /assets/characters/[name]-[emotion].png
   ```
   Examples: 
   - `anna-worried.png`
   - `director-angry.png`
   - `partner-surprised.png`

3. For backgrounds:
   ```
   /assets/backgrounds/[location].jpg
   ```

## Story Configuration

The demo story is configured in `src/data/stories.json`:

```json
{
  "id": "story_demo",
  "title": "🎭 ДЕМО: Офисные интриги",
  "startSceneId": "demo_scene_001",
  "episodes": [
    {
      "id": "demo_ep_1",
      "title": "Демо: Первый день",
      "sceneIds": ["demo_scene_001", "demo_scene_002", ...]
    }
  ]
}
```

## Stat Effects Summary

Playing through all scenes can earn:
- **Honesty**: 1-3 points per choice
- **Cunning**: 1-4 points per choice
- **Charm**: 1-3 points per choice
- **Reputation**: -3 to +3 points per choice

## Next Steps

1. ✅ Test the demo to verify dialogue system works
2. ✅ Share with stakeholders for feedback
3. 🎨 Wait for artistic team to create unique assets
4. 📝 Write more scenes using `DIALOGUE_TEMPLATE.md`
5. 🔄 Replace placeholder images with final art

## Tips for Writing More Scenes

- Keep dialogue lines to **1-3 sentences max**
- Use **3-7 dialogue entries** per scene
- Change character sprites to show emotions
- Always include a **free action** option
- Mix choice types (free, paid, stat-locked)

---

**Created for quick preview while artistic team is working on assets!** 🚀

