# 🚀 Quick Start - Background Removal App v2

## What's New ✨

Your app now has a **backend API** that handles image uploads securely!

- ✅ No more CORS errors
- ✅ Secure communication with n8n
- ✅ Better error messages
- ✅ Production-ready architecture

---

## 🏃 Get Started in 3 Steps

### Step 1: Install Dependencies (First Time Only)
```bash
cd "/Users/panka/Background Remover/clearcut-ai"
npm install
```

### Step 2: Start the App
```bash
npm run dev
```

This starts:
- **Frontend:** http://localhost:8080/ ✅
- **Backend:** http://localhost:5000/ ✅

### Step 3: Test It
1. Open http://localhost:8080/ in your browser
2. Upload an image
3. Click "Remove Background"
4. ✨ It should work now!

---

## 📁 What Changed

| File | Change |
|------|--------|
| `server.js` | ✨ **NEW** - Express API server |
| `.env.development` | ✨ **NEW** - Dev API URL |
| `.env.production` | ✨ **NEW** - Prod API URL |
| `package.json` | Updated - Backend deps + concurrently |
| `UploadZone.tsx` | Updated - Uses `/webhook/remove-bg` |
| `BACKEND_SETUP.md` | ✨ **NEW** - Detailed backend docs |

---

## 🎯 How It Works

### Old Way (Direct Frontend Call)
```
Browser → n8n Webhook ❌ CORS Error
```

### New Way (Backend API)
```
Browser → Your Backend API → n8n Webhook ✅ Works!
```

---

## 🔧 Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Use a different port
PORT=5001 npm run dev:backend
```

### Problem: "Background removal doesn't work"
**Check:**
1. Both servers are running (browser shows 2 running processes)
2. Backend is accessible: `curl http://localhost:5000/health`
3. Check browser console (F12) for error messages

---

## 📞 Need Help?

See these files for more info:
- `BACKEND_SETUP.md` - Detailed backend documentation
- `BACKGROUND_REMOVAL_ERROR_FIX.md` - Error troubleshooting
- `GOOGLE_OAUTH_FINAL_SETUP.md` - OAuth setup

---

## ✅ You're Ready!

```bash
npm run dev
```

Then visit: **http://localhost:8080/**

Good luck! 🎉
