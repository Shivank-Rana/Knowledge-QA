# 🚀 Complete Setup Guide - Knowledge Q&A with Gemini AI

This guide will help you set up your Knowledge Q&A app with Supabase and Gemini AI.

## 📋 Prerequisites

1. **Node.js 18+** - Download from https://nodejs.org/
2. **VS Code** - Download from https://code.visualstudio.com/
3. **Google Account** - For Gemini API (free!)
4. **Supabase Account** - Free at https://supabase.com/

## 🎯 Total Setup Time: ~15 minutes

---

## ⚙️ Part 1: Local Setup

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download **LTS version**
3. Install it (just click Next → Finish)
4. Verify in terminal:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Open Project in VS Code

1. Open VS Code
2. File → Open Folder → Select your project folder
3. Open Terminal: Ctrl + ` (backtick)

### Step 3: Install Dependencies

In the terminal, type:
```bash
npm install
```

Wait for it to finish (1-2 minutes)

---

## 🌐 Part 2: Supabase Setup

### Step 1: Create Supabase Account

1. Go to https://supabase.com/
2. Click **"Start your project"**
3. Sign up with GitHub or email
4. Create a new project:
   - **Project Name**: knowledge-qa-app
   - **Database Password**: Create a strong one
   - **Region**: Select your region

### Step 2: Wait for Project Creation

Supabase will create your database (takes ~2 minutes)

### Step 3: Create Database Table

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  uploadedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations" ON documents
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_documents_uploadedAt ON documents(uploadedAt DESC);
```

4. Click **Run** (or Ctrl+Enter)
5. You should see **Success!**

### Step 4: Get Your Credentials

1. Go to **Settings → API** (left sidebar)
2. Copy these two values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Publishable Key** (anon key) → `VITE_SUPABASE_ANON_KEY`

### Step 5: Add to Your Project

1. In VS Code, open `.env.local`
2. Paste your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key-here
VITE_GEMINI_API_KEY=
```

Save the file (Ctrl+S)

---

## 🤖 Part 3: Gemini API Setup

### Step 1: Get Free Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Click **"Create API key in new project"**
5. Wait for it to generate
6. Click the **copy icon**

### Step 2: Add to Your Project

1. In VS Code, open `.env.local`
2. Paste your Gemini key:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key-here
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

Save the file (Ctrl+S)

---

## ✅ Part 4: Run Your App

### Step 1: Start Development Server

In the terminal, type:
```bash
npm run dev
```

You should see:
```
VITE v7.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 2: Open in Browser

1. Click the link or go to `http://localhost:5173/`
2. You should see your Knowledge Q&A app! 🎉

### Step 3: Test It

1. **Upload a document**:
   - Go to "Upload & Manage" tab
   - Select a text file (.txt, .md, .json)
   - Click "Upload Document"

2. **Ask a question**:
   - Go to "Ask Questions" tab
   - Type a question
   - Click "Get Answer"
   - Wait for AI to respond! 🤖

---

## 🚀 Part 5: Deploy to Vercel

### Step 1: Push to GitHub

1. Create a GitHub account at https://github.com/
2. Create a new repository
3. Push your code to GitHub

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/
2. Sign up (or login with GitHub)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
6. Click **"Deploy"**

That's it! Your app is now live! 🎉

---

## 📊 What Your App Can Do

✅ **Upload documents** (txt, md, json files)
✅ **Search documents** with keyword matching
✅ **Ask questions** using Google Gemini AI
✅ **Get AI-powered answers** based on your documents
✅ **View sources** - see which document was used
✅ **Delete documents** you no longer need
✅ **Check system health** - verify everything works

---

## 🆘 Troubleshooting

### "npm: command not found"
- Node.js not installed
- Restart your computer after installing Node.js

### "Failed to upload document"
- Check your Supabase credentials in `.env.local`
- Make sure the documents table was created
- Restart your dev server (Ctrl+C, then `npm run dev`)

### "AI Error: Gemini API key is not configured"
- Check you added the key to `.env.local`
- Restart your dev server
- Make sure there are no extra spaces in the key

### "Port 5173 already in use"
- Run: `npm run dev -- --port 3000`

---

## 📚 Environment Variables Summary

Your `.env.local` should have:

```
# Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# Gemini AI
VITE_GEMINI_API_KEY=AIzaSyD...
```

---

## ✨ You're All Set!

Your Knowledge Q&A app is now:
- ✅ Running locally
- ✅ Connected to Supabase database
- ✅ Powered by Google Gemini AI
- ✅ Ready to deploy to Vercel

**Next steps**:
1. Test uploading and asking questions
2. Push to GitHub
3. Deploy on Vercel
4. Share with others!

🚀 **Happy coding!**
