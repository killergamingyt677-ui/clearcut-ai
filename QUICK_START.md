# 🚀 Quick Start Guide

## Start the App Locally

```bash
cd "/Users/panka/Background Remover/clearcut-ai"
npm run dev
```

Then open: **http://localhost:8080/**

---

## Deploy Changes to GitHub

```bash
# Add and commit changes
git add .
git commit -m "Your message here"

# Push to GitHub (auto-deploys to Vercel)
git push

# View on production
# https://clearcut-ai-kappa.vercel.app/
```

---

## Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| Background Removal | ✅ Working | Uploads binary to n8n webhook |
| Image Download | ✅ Working | Automatic blob download |
| History Tracking | ✅ Working | Persists in localStorage |
| Google OAuth Code | ✅ Ready | Implementation complete |
| Google Cloud Setup | ⏳ Needed | 5-minute setup required |
| GitHub Deployment | ✅ Active | Auto-deploys on git push |

---

## Google OAuth Setup

**⚠️ IMPORTANT:** Before OAuth works, complete the setup in `GOOGLE_OAUTH_FINAL_SETUP.md`

Quick summary:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit "ZeroBG" OAuth client
3. Add these redirect URIs:
   - http://localhost:8080
   - http://localhost:5173
   - http://localhost:3000
   - https://clearcut-ai-kappa.vercel.app
   - https://clearcut-ai-kappa.vercel.app/login
   - https://clearcut-ai-kappa.vercel.app/register
4. Click SAVE
5. Wait 5-10 minutes
6. Add test user: killergamingyt677@gmail.com
7. Test on http://localhost:8080/ ✅

---

## File Structure

```
src/
├── lib/
│   └── auth.ts                 # OAuth & auth utilities
├── pages/
│   ├── Login.tsx              # Google OAuth login
│   ├── Register.tsx           # Google OAuth signup
│   └── Dashboard.tsx          # Main app with tabs
├── components/
│   ├── dashboard/
│   │   ├── UploadZone.tsx     # Image upload & processing
│   │   └── History.tsx        # View/download history
│   └── ui/                    # shadcn components
└── main.tsx                   # OAuth provider wrapper

.env.local                      # Google Client ID
```

---

## Available Commands

```bash
# Development
npm run dev              # Start dev server on 8080

# Building
npm run build           # Production build
npm run preview        # Preview production build

# Testing
npm run test           # Run tests
npm test:ui            # Run tests with UI

# Code Quality
npm run lint           # Check for lint errors

# Git
git status             # See changes
git add .              # Stage all changes
git commit -m "msg"    # Commit with message
git push               # Push to GitHub (auto-deploys)
```

---

## Vercel Deployment

The app auto-deploys when you push to GitHub main branch.

Check deployment:
1. Visit: https://vercel.com/dashboard
2. Select "clearcut-ai" project
3. See deployment status

---

## Need Help?

See `GOOGLE_OAUTH_FINAL_SETUP.md` for detailed troubleshooting and verification checklist.
