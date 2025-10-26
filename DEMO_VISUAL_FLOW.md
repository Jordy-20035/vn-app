# 🎬 Demo Story - Visual Flow

## Story Overview
**🎭 ДЕМО: Офисные интриги** - "Office Intrigue Demo"

---

## Scene Flow Diagram

```
                    START
                      ↓
          ┌───────────────────────┐
          │   SCENE 1: Утро       │
          │   Morning at Office   │
          │                       │
          │   Anna + Secretary    │
          │   4 dialogue lines    │
          └───────────────────────┘
                      ↓
         ┌────────────┼────────────┐
         │            │            │
    [Accept]    [Demand Info]  [Bribe 💎20]
         │            │            │
         ↓            ↓            ↓
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ SCENE 2  │  │ SCENE 3  │  │ SCENE 4  │
  │ Prepare  │  │Confronta-│  │Unexpected│
  │          │  │   tion    │  │   Turn   │
  │3 lines   │  │4 lines   │  │4 lines   │
  └──────────┘  └──────────┘  └──────────┘
         │            │            │
         ↓            ↓            ↓
    [3 choices]  [3 choices]  [3 choices]
         │            │            │
         └────────────┼────────────┘
                      ↓
          ┌───────────────────────┐
          │   SCENE 5: Встреча    │
          │   Meeting Client      │
          │                       │
          │   Anna + Secretary    │
          │   5 dialogue lines    │
          └───────────────────────┘
                      ↓
              [3 final choices]
                      ↓
              EPISODE SUMMARY
                      ↓
                     END
```

---

## Scene Details

### 🎬 Scene 1: Morning at Office
**Background:** Agency Lobby  
**Characters:**
- Anna (neutral) - left position
- Secretary (smile) - right position

**Dialogue Flow:**
1. Anna (internal thought) - neutral
2. Secretary greets - smiling
3. Anna asks question - neutral
4. Secretary responds mysteriously - neutral

**Player Choices:**
- ✅ Accept meeting (+1 Honesty)
- ✅ Demand information now (+1 Cunning)
- 💎 Bribe secretary - 20 diamonds (+2 Cunning, -1 Reputation)
- ✨ Free AI action

---

### 🎬 Scene 2: Preparing for Meeting
**Background:** Office Interior  
**Characters:**
- Anna (neutral → happy) - emotion change!
- Secretary (smile) - right position

**Dialogue Flow:**
1. Anna plans ahead - neutral
2. Secretary encourages - smiling
3. Anna feels confident - **happy** 😊

**Player Choices:**
- ✅ Research client (+1 Cunning, +1 Charm)
- ✅ Relax with coffee (+1 Charm)
- ✅ Skip meeting (+2 Cunning, -2 Reputation)
- ✨ Free AI action

---

### 🎬 Scene 3: Confrontation
**Background:** Office Desk  
**Characters:**
- Anna (neutral → happy) - emotion change!
- Secretary (neutral → smile)

**Dialogue Flow:**
1. Anna demands details - neutral
2. Secretary reveals client name - neutral
3. Anna recognizes name - **happy** 😊
4. Secretary warns secrecy - smile

**Player Choices:**
- ✅ Promise secrecy (+2 Honesty, +1 Charm)
- 🔒 **Use info for yourself** - REQUIRES Cunning ≥ 3 (+3 Cunning, -2 Reputation)
- ✅ Tell colleagues (+1 Cunning, -3 Reputation)
- ✨ Free AI action

---

### 🎬 Scene 4: Unexpected Turn
**Background:** Office Interior  
**Characters:**
- Secretary (neutral) - right position
- Anna (neutral → happy) - emotion change!

**Dialogue Flow:**
1. Secretary panics - neutral
2. Anna shocked - neutral
3. Secretary explains cameras - neutral
4. Anna stays composed - **happy** (brave face)

**Player Choices:**
- ✅ Face director honestly (+3 Honesty, +1 Reputation)
- ✅ Blame secretary (+3 Cunning, -3 Reputation)
- 🔒 **Charm your way out** - REQUIRES Charm ≥ 5 (+2 Charm, +2 Reputation)
- ✨ Free AI action

---

### 🎬 Scene 5: Meeting with Client (FINALE)
**Background:** Agency Lobby  
**Characters:**
- Anna (happy → neutral → happy) - multiple emotions!
- Secretary (neutral → smile)

**Dialogue Flow:**
1. Anna greets client - **happy**
2. Secretary updates - neutral
3. Anna gets serious - **neutral**
4. Secretary wishes luck - **smile**
5. Anna commits - **happy**

**Player Choices:**
- ✅ Professional approach (+2 Honesty, +3 Reputation, +1 Charm)
- ✅ Personal approach (+3 Charm, +2 Reputation)
- 💎 Manipulate - 30 diamonds (+4 Cunning, +1 Reputation)
- ✨ Free AI action

---

## Statistics Tracking

### Maximum Stats Achievable:
- **Honesty:** Up to +8 (via honest path)
- **Cunning:** Up to +11 (via manipulative path)
- **Charm:** Up to +7 (via charismatic path)
- **Reputation:** -8 to +9 (highly variable!)

### Recommended Paths:

**🌟 Hero Path** (Honesty focus):
- Scene 1: Accept meeting
- Scene 2: Research client
- Scene 3: Promise secrecy
- Scene 4: Face director
- Scene 5: Professional approach
- **Result:** +8 Honesty, +7 Reputation, +2 Charm, +1 Cunning

**😈 Cunning Path** (Manipulation focus):
- Scene 1: Bribe secretary (💎20)
- Scene 2: Skip meeting
- Scene 3: Use info (🔒 need Cunning ≥3)
- Scene 4: Blame secretary
- Scene 5: Manipulate (💎30)
- **Result:** +11 Cunning, -8 Reputation
- **Cost:** 50 💎

**💫 Charisma Path** (Social focus):
- Scene 1: Accept meeting
- Scene 2: Relax with coffee
- Scene 3: Promise secrecy
- Scene 4: Charm way out (🔒 need Charm ≥5)
- Scene 5: Personal approach
- **Result:** +7 Charm, +5 Reputation, +2 Honesty

---

## Technical Features Showcased

### ✨ Dialogue System
- Typewriter effect (80ms/char)
- Character fade-in/fade-out
- Progress indicator (e.g., "3 / 5")
- "Next" button between lines
- Skip dialogue option

### 🎭 Character System
- Dynamic sprite changes
- Emotion transitions
- Position management (left/right)
- Scale options

### 🎮 Choice System
- Free choices (unlimited)
- Paid choices (💎 cost shown)
- Stat-locked (🔒 with requirement)
- AI free actions (✨)

### 💎 Economy
- Diamond spending (50💎 max in demo)
- Stat tracking (4 stats)
- Episode rewards (+8💎)

---

## Assets Inventory

### Used in Demo:
```
/assets/backgrounds/
  ├── agency_lobby.jpg    (3 times)
  ├── office_interior.jpg (2 times)
  └── office_desk.jpg     (1 time)

/assets/characters/
  ├── anna-neutral.png    (9 times)
  ├── anna-happy.png      (6 times)
  ├── sec-neutral.png     (5 times)
  └── sec-smile.png       (5 times)
```

**Total unique assets: 8 files**

---

## For the Artistic Team

### Backgrounds Needed (Priority):
1. **agency_lobby.jpg** - Reception area, professional
2. **office_interior.jpg** - Private office, elegant
3. **office_desk.jpg** - Close-up desk/workspace

### Characters Needed (Priority):
**Anna (Protagonist):**
- neutral.png - Default expression
- happy.png - Confident, smiling
- worried.png - Concerned (future scenes)
- angry.png - Frustrated (future scenes)

**Secretary (Supporting):**
- neutral.png - Professional
- smile.png - Friendly
- worried.png - Anxious (future scenes)

**Director (Future):**
- neutral.png
- serious.png
- angry.png

### Specifications:
- **Character sprites:** PNG with transparency
- **Size:** 1080px height recommended
- **Format:** Full body or 3/4 body
- **Background:** 1920×1080px, JPG
- **Style:** Consistent art style across all assets

---

**📊 Total Content:**
- 5 scenes ✅
- 20 dialogue lines ✅
- 21 player choices ✅
- 4 stat-locked choices ✅
- 2 paid choices ✅
- 8 unique assets ✅

**Ready for presentation! 🎉**

