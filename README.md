# 🚀 Knowledge Q&A with Gemini AI

A modern web application for uploading documents and asking intelligent questions using **Google Gemini AI**. Built with React, Vite, Supabase, and Google's Generative AI.

## 🎯 Features

✅ **Upload Documents** - Upload text files (.txt, .md, .json)
✅ **AI-Powered Answers** - Uses Google Gemini to understand and answer questions
✅ **See Sources** - View which documents were used to generate answers
✅ **Manage Documents** - View, delete, and organize your documents
✅ **System Health** - Monitor database and system status
✅ **Real-time Sync** - All changes saved to Supabase PostgreSQL
✅ **Responsive UI** - Works on desktop, tablet, and mobile
✅ **Easy Deployment** - Deploy to Vercel in minutes

## 🤖 What Makes It Smart?

Instead of simple keyword matching, this app uses **Google's Gemini AI** to:
- Understand the meaning of your questions
- Search for relevant information in your documents
- Generate intelligent, context-aware answers
- Provide accurate citations and sources

## 🚀 Quick Start (5 Minutes) 

### Prerequisites

- Node.js 16+
- npm or yarn
- Free Supabase account
- Free Google Gemini API key

### Step 1: Setup Local Project

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Step 2: Configure Supabase

1. Go to https://supabase.com/
2. Create a free project
3. Create the documents table (SQL provided in SUPABASE_SETUP_GUIDE.md)
4. Get your `Project URL` and `Publishable Key`
5. Add to `.env.local`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

### Step 3: Configure Gemini AI

1. Go to https://aistudio.google.com/app/apikey
2. Create a new API key (free!)
3. Add to `.env.local`:

```env
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Step 4: Run the App

```bash
npm run dev
```

Open http://localhost:5173 and start uploading documents! 🎉

## 📁 Project Structure

```
knowledge-qa-app/
├── src/
│   ├── components/
│   │   ├── DocumentUpload.tsx      # File upload form
│   │   ├── DocumentList.tsx        # List & delete docs
│   │   ├── QuestionAnswer.tsx      # AI question interface
│   │   └── HealthStatus.tsx        # System health
│   ├── config/
│   │   ├── supabase.ts             # Supabase setup
│   │   └── gemini.ts               # Gemini AI setup
│   ├── lib/
│   │   └── documentUtils.ts        # Database operations
│   └── App.tsx                     # Main component
├── index.html
├── package.json
├── vite.config.ts
└── .env.local                      # ⚠️ Never commit!
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Tailwind CSS |
| **Build** | Vite |
| **Database** | Supabase PostgreSQL |
| **AI** | Google Generative AI (Gemini) |
| **Hosting** | Vercel |

## 💡 How It Works

### Document Upload
```
User Selects File → Validate → Save to Supabase → Display in List
```

### AI Question Answering
```
User Question → Load Documents → Send to Gemini AI → Get Smart Answer
↓
Gemini analyzes question + documents → Generates answer + cites sources
```

## 🔐 Security

- ✅ API keys in environment variables only
- ✅ `.env.local` is gitignored
- ✅ Supabase RLS policies configured
- ✅ Input validation on all uploads
- ✅ No sensitive data in code

## 📚 Detailed Setup Guides

- **[COMPLETE_SETUP.md](./COMPLETE_SETUP.md)** - Full step-by-step guide
- **[SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)** - Database setup
- **[GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md)** - AI setup
- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - Deployment

## 🚀 Deploy to Vercel

```bash
# Push to GitHub first
git push origin main

# Then:
# 1. Go to vercel.com
# 2. Import your GitHub repo
# 3. Add environment variables
# 4. Deploy!
```

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for details.

## 📊 Database Schema

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  uploadedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI Features

- **Tabbed Interface** - Switch between Upload, Ask, and Health tabs
- **Real-time Updates** - Documents list updates instantly
- **Loading States** - Visual feedback during uploads/searches
- **Error Handling** - User-friendly error messages
- **Responsive Design** - Works on all screen sizes
- **Gradient UI** - Modern, professional appearance

## 🧪 Testing Your Setup

1. **Upload a document**
   - Go to "Upload & Manage" tab
   - Upload a `.txt` file with some content
   - See it appear in the list

2. **Ask a question**
   - Go to "Ask Questions" tab
   - Type a question about your document
   - Watch Gemini AI respond! 🤖

3. **Check health**
   - Go to "System Health" tab
   - Verify Supabase connection

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 📈 Performance

- **Page Load:** < 2 seconds
- **Document Upload:** 1-3 seconds
- **AI Response:** 2-5 seconds (depends on question)
- **Optimized for:** Modern browsers

## 🆘 Troubleshooting

### "Gemini API key is not configured"
- Check `.env.local` has the key
- Restart dev server: `npm run dev`
- Verify key is correct (no spaces)

### "Failed to load documents"
- Check Supabase credentials
- Verify documents table exists
- Check browser console for errors

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

## 🔗 Useful Links

- [Gemini API Docs](https://ai.google.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

MIT

## 🙏 Credits

Built with:
- [Google Generative AI](https://ai.google.dev/)
- [Supabase](https://supabase.com/)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Ready to build your AI-powered knowledge base? Let's go! 🚀**

Questions? Check the guides or open an issue on GitHub!

Made with ❤️ using AI + React + Supabase
