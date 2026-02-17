# Supabase Setup Guide for Knowledge Q&A App

This guide will help you set up Supabase to power your Knowledge Q&A application.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project for free"
3. Sign up with your email or GitHub account
4. Verify your email

## Step 2: Create a New Project

1. Click "New Project" on the dashboard
2. Fill in project details:
   - **Project Name:** `knowledge-qa-app` (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to you (e.g., US East 1)
3. Click "Create new project"
4. Wait for the project to be created (2-3 minutes)

## Step 3: Get Your API Credentials

Once your project is created:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** key (VITE_SUPABASE_ANON_KEY)
3. Save these securely

## Step 4: Create the Documents Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL:

```sql
-- Create documents table
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  uploadedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_documents_uploadedAt ON documents(uploadedAt DESC);

-- Enable RLS (Row Level Security) - make it public for now
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read/write (adjust as needed)
CREATE POLICY "Enable all access for now" ON documents
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run"
5. You should see "Success!" message

## Step 5: Configure Your App

1. Open `.env.local` in your project root
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-id` and `your-anon-key-here` with your actual values.

## Step 6: Test Your Setup

1. Start the development server:
```bash
npm run dev
```

2. Go to `http://localhost:5173`
3. Try uploading a test document
4. Check the **System Health** tab - database should show ✅

## Step 7: Monitor Your Database (Optional)

To see your documents in Supabase:

1. Go to **Table Editor** in your Supabase project
2. Click on "documents" table
3. You should see your uploaded documents

## Troubleshooting

### Error: "Cannot read properties of undefined"
- Make sure `.env.local` has your Supabase URL and key
- Restart your dev server after changing `.env.local`

### Error: "Supabase credentials are missing"
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in `.env.local`
- Ensure there are no typos

### Error: "No documents available"
- Make sure the `documents` table was created successfully
- Go to **Table Editor** and verify the `documents` table exists

### RLS Policies Issue
- If you see permission errors, go to **Authentication** → **Policies**
- Make sure the public policy is enabled for your documents table

## Security Notes

⚠️ **For Production:**

1. **Don't use public RLS policies** - Set up proper authentication
2. **Secure your API keys** - Never commit `.env.local` to git
3. **Use .env.local** for local development
4. **Use Vercel Environment Variables** for production (see VERCEL_DEPLOYMENT_GUIDE.md)

## Next Steps

After setting up Supabase:

1. ✅ Test uploading documents
2. ✅ Test asking questions
3. ✅ Test the health check page
4. ✅ Deploy to Vercel (see VERCEL_DEPLOYMENT_GUIDE.md)

## Support

For issues with Supabase:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)
