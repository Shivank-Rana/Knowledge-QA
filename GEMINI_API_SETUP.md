# 🤖 Gemini API Setup Guide

This guide will help you get a free Gemini API key to power the AI features in your Knowledge Q&A app.

## 📋 What You'll Need

- A Google account (free)
- The Gemini API key

## ✅ Step-by-Step Setup

### Step 1: Go to Google AI Studio

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** button

### Step 2: Create a New API Key

1. Click **"Create API key in new project"**
2. Wait for it to generate (takes a few seconds)
3. You'll see your new API key

### Step 3: Copy Your API Key

1. Click the **copy icon** next to your API key
2. Save it somewhere safe (you'll need it next)

### Step 4: Add to Your Project

1. Open your project's `.env.local` file
2. Paste your API key:

```
VITE_GEMINI_API_KEY=your-api-key-here
```

**Example:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GEMINI_API_KEY=AIzaSyD...your-actual-key...
```

### Step 5: Restart Your App

1. Stop your development server (Ctrl+C)
2. Run it again:
   ```bash
   npm run dev
   ```

## ✅ Test It Out

1. Upload a document
2. Go to "Ask Questions" tab
3. Ask a question
4. Wait for the AI to think and respond 🤖

## 🎯 How It Works

- **Without Gemini Key**: App will show an error
- **With Gemini Key**: App uses Google's Gemini AI to answer questions based on your documents

## 📊 Gemini API Limits (Free Tier)

- **Requests per minute**: 60 RPM
- **Requests per day**: 1,500 per day
- **Cost**: FREE!

Perfect for development and testing!

## 🔐 Security Notes

⚠️ **Important**: Never share your API key with anyone
- Never commit it to Git
- Never expose it in public code
- Keep it in `.env.local` (which is gitignored)

## ❓ Troubleshooting

### "Gemini API key is not configured"
- Make sure you added the key to `.env.local`
- Restart your development server after adding the key
- Check the key is correct (no extra spaces)

### "AI Error: Invalid API key"
- Your API key might be incorrect
- Generate a new one at https://aistudio.google.com/app/apikey

### "Rate limit exceeded"
- You've hit the free tier limit
- Wait a few minutes and try again
- Or upgrade to a paid plan

## 📚 Learn More

- Gemini API Docs: https://ai.google.dev/
- Google AI Studio: https://aistudio.google.com/

---

**You're all set! Your app now has AI-powered question answering! 🚀**
