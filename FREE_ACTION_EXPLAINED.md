# 🎭 Free Action System - How It Works

## What is a "Free Action"? (Свободное действие)

**Free Action** is a special AI-powered feature that lets players perform custom actions beyond the pre-written choices. It's a **side action** that doesn't immediately progress the story.

## 📖 How It Works:

### 1. **Player Triggers Free Action**
   - Player clicks: "✨ Свободное действие..."
   - Modal opens asking:
     - **"Что вы хотите сделать?"** (What do you want to do?)
     - **"Как вы это сделаете?"** (How will you do it?)

### 2. **AI Processes the Action**
   - Your action is sent to YandexGPT
   - AI considers:
     - Current scene context
     - Your character's stats
     - Available characters
     - World lore and rules
   - AI generates a response with:
     - **Narrative** (what happened)
     - **Outcome** (success, neutral, failure, etc.)
     - **Stat changes** (if any)

### 3. **Result is Shown**
   - Alert popup displays:
     ```
     🎭 Ответ AI:
     
     [AI's narrative response]
     
     Исход: success
     
     📊 Статы:
     charm: +1
     
     ✅ Теперь выберите один из основных вариантов, чтобы продолжить.
     ```

### 4. **Game Continues**
   - After clicking OK, you're back at the same scene
   - Your stats have been updated (HUD shows new values)
   - **You must now choose one of the main options** to progress the story

## 🎯 Example from Your Screenshot:

**You wrote:**
- **Что:** попросить кофе у секретаря
- **Как:** вежливо

**AI Response:**
> Секретарь улыбается и говорит: «Конечно, одну минуту.» Она достаёт чашку и начинает готовить кофе. Анна чувствует, что её обаяние помогло в этом простом, но важном моменте.
> 
> **Исход:** success

**What happened:**
1. ✅ AI interpreted your action
2. ✅ Generated a realistic response
3. ✅ Determined it was a success
4. ✅ (Probably) increased your Charm stat

**What's next:**
- The story doesn't auto-continue because **free actions are optional side interactions**
- To progress, you must choose one of the main options:
  - "Спросить, где директор?"
  - "Проигнорировать и пройти мимо"
  - "Предложить взятку за встречу" (20 💎)

## 🎮 Design Philosophy:

### Why doesn't the story auto-continue?

**Free actions are meant to:**
- Let you **interact with the world** in creative ways
- **Build stats** through roleplay
- **Add flavor** to your playthrough
- Give you **agency** without breaking the main narrative

**They are NOT meant to:**
- Replace main story choices
- Automatically advance the plot
- Skip important decisions

## 🔄 Complete Flow Example:

```
1. Scene: "Вход в агентство"
   └─ You see 4 options (3 main + 1 free action)

2. Click: "✨ Свободное действие..."
   └─ Modal opens

3. Fill in: "попросить кофе" / "вежливо"
   └─ AI processes

4. AI Response: "Secretary makes you coffee"
   └─ +1 Charm
   └─ Click OK

5. Back at Scene: "Вход в агентство"
   └─ Your Charm is now 1 instead of 0
   └─ Choose one of the 3 main options to continue

6. Choose: "Спросить, где директор?"
   └─ Story progresses to next scene
```

## 🚀 Advanced: AI Scene Transitions

In rare cases, if your free action is **extremely impactful**, the AI might suggest a scene transition by setting `nextScene` in its response. For example:

- If you ask for coffee, you stay at the same scene
- But if you ask to see the director and the AI decides you somehow convinced the secretary to let you in immediately, it might transition you to the director's office scene

This is rare and only happens when the AI determines your action fundamentally changes the situation.

## 📊 Stat Tracking

Your free actions can affect your stats:
- **Честность (Honesty)** - Honest, direct approaches
- **Хитрость (Cunning)** - Manipulative, clever actions
- **Репутация (Reputation)** - Actions that affect how others see you
- **Обаяние (Charm)** - Charismatic, social interactions

The AI decides stat changes based on:
- Your action's nature
- How you perform it
- The outcome (success/failure)

## ✅ Summary

**Free Actions = Side Interactions**
- They enrich your experience
- They build your character's stats
- They don't replace main story choices
- You must still choose a main option to progress

**This is working as designed!** 🎉

