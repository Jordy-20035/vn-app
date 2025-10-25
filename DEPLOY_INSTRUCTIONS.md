# 🚀 Deployment Instructions

## Issues Fixed:
1. ✅ CORS error when calling YandexGPT API (now uses serverless proxy)
2. ✅ Character positioning (now at screen extremities: 5% and 75%)

## Deploy to Vercel:

### Step 1: Set Environment Variables in Vercel
Go to your Vercel project settings and add these environment variables:

```
VITE_YANDEX_API_KEY=AQVNyO0XxGnTaNecjcnHVQh_92B7swE0TWn2re2B
VITE_YANDEX_FOLDER_ID=b1g13ksmlceq989m9qrp
```

**Important:** These must be added to Vercel's environment variables section!

### Step 2: Deploy

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option B: Using Git (if connected to GitHub)
Just push your changes:
```bash
git add .
git commit -m "Fix CORS and character positioning"
git push
```

Vercel will automatically deploy.

### Step 3: Verify Deployment
1. Go to your deployed URL: https://your-app.vercel.app
2. Start a game
3. Click "✨ Свободное действие..."
4. Fill in:
   - **Что:** попросить кофе у секретаря
   - **Как:** вежливо
5. Click "Отправить"
6. You should see an AI-generated response!

### Step 4: Update Telegram Bot
Once deployed, update your bot's mini app URL in @BotFather:
```
/setmenubutton
[Select your bot]
[Paste new URL]
```

## How the Proxy Works:

**Before (CORS Error):**
Browser → YandexGPT API ❌ (blocked by CORS)

**After (Working):**
Browser → Vercel Serverless Function → YandexGPT API ✅

The serverless function at `/api/yandex-gpt` makes the request from the server side, avoiding CORS restrictions.

## Character Positioning:

Characters now appear at:
- **Anna (left):** 5% from left edge
- **Secretary (right):** 75% from left edge (25% from right)

This places them at screen extremities as intended.

## Testing Locally:

⚠️ **Note:** The proxy won't work in local dev (`npm run dev`) because the `/api/` route only exists on Vercel.

For local testing, you would need to:
1. Run a local proxy server, OR
2. Temporarily revert to direct API calls (with CORS errors), OR
3. Test only after deploying to Vercel

**Recommendation:** Deploy to Vercel and test there!

