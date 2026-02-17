# Vercel Deployment Guide

This guide will help you deploy your Knowledge Q&A app to Vercel.

## Prerequisites

- ✅ Supabase project set up (see SUPABASE_SETUP_GUIDE.md)
- ✅ GitHub account
- ✅ Vercel account (free)

## Step 1: Push Your Code to GitHub

### If you haven't already:

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it `knowledge-qa-app`
4. Choose **Public** (recommended for Vercel free tier)
5. Click "Create repository"

### Push your local code:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Knowledge Q&A app with Supabase"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/knowledge-qa-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "Sign up" (or sign in)
3. Sign up with your GitHub account
4. Authorize Vercel to access your repositories
5. Click "Continue"

## Step 3: Import Your Project

1. On Vercel dashboard, click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Find your `knowledge-qa-app` repository
4. Click "Import"

## Step 4: Configure Environment Variables

1. You'll see the **Environment Variables** section
2. Add your Supabase credentials:

```
VITE_SUPABASE_URL = https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

**Important:** Use the same values from your `.env.local`

3. Click "Deploy"

## Step 5: Wait for Deployment

1. Vercel will start building your project
2. You'll see a progress indicator
3. Wait for "✓ Deployment successful!" message
4. You'll get a URL like: `https://knowledge-qa-app-xyz.vercel.app`

## Step 6: Test Your Live App

1. Click the deployment URL
2. Test uploading a document
3. Test asking questions
4. Check the health status page

## Step 7: Update Your Supabase RLS (Important!)

Your live app is now public, so update security:

1. Go to your Supabase project
2. Click **Authentication** → **Policies**
3. Update the documents table policy to be more restrictive:

```sql
-- Restrict to authenticated users (optional)
CREATE POLICY "Authenticated users can access documents" ON documents
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

Or for a demo (public access):
```sql
-- Keep the public policy for demo purposes
CREATE POLICY "Public access" ON documents
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Continuous Deployment

Great news! Vercel automatically deploys when you:

1. Push to `main` branch on GitHub
2. Vercel automatically rebuilds and deploys
3. No manual steps needed!

### To deploy changes:

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically deploy!
```

## Setting a Custom Domain (Optional)

1. On your Vercel project page, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `knowledge-qa.yoursite.com`)
3. Follow DNS instructions
4. Wait for DNS to propagate (can take 24-48 hours)

## Monitoring Your Deployment

On Vercel dashboard:
- **Deployments tab**: See all past deployments
- **Analytics**: Track usage (Pro feature)
- **Logs**: Debug issues in real-time

## Troubleshooting

### Build fails with "VITE_SUPABASE_URL is missing"
- Go to **Settings** → **Environment Variables**
- Make sure both variables are set
- Redeploy (click "Redeploy" button)

### App shows "Supabase credentials are missing"
- Check environment variables in Vercel settings
- Make sure there are no extra spaces
- Clear browser cache and reload

### Documents not uploading
- Check Supabase table exists
- Go to Supabase **Table Editor** and verify `documents` table
- Check RLS policies allow inserts

### "Database check failed" in Health Status
- Verify Supabase credentials are correct in Vercel
- Test Supabase connection in your local dev environment
- Check Supabase project status

## Performance Tips

1. **Keep documents concise** - Shorter documents = faster searches
2. **Use meaningful file names** - Helps with organization
3. **Archive old documents** - Delete unused documents to improve performance

## Cost Estimate

- **Vercel:** Free tier (up to 100GB bandwidth/month)
- **Supabase:** Free tier (500MB storage, 2 concurrent connections)
- **Total:** $0/month for most use cases

## Next Steps

1. ✅ Test your live app
2. ✅ Share the URL with others
3. ✅ Consider adding authentication (optional)
4. ✅ Set up custom domain (optional)

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- Stuck? Check the GitHub Issues in your repo

---

**Your live app is now running! 🚀**

Visit: `https://your-project.vercel.app`
