# 🚀 Backend API Setup - Background Removal

## Overview

Your app now uses a **local backend API** to securely communicate with the n8n webhook. This fixes CORS issues and provides better error handling.

---

## ✨ Why This Is Better

### Before (Direct Frontend Call)
❌ CORS errors from browser  
❌ Direct exposure of webhook URL  
❌ Limited error handling  
❌ No request validation  

### After (Backend Proxy)
✅ No CORS issues  
✅ Secure communication  
✅ Better error messages  
✅ Request validation  
✅ Easy scaling to microservices  

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
cd "/Users/panka/Background Remover/clearcut-ai"
npm install
```

This installs:
- Frontend dependencies (React, Vite, etc.)
- Backend dependencies (Express, multer, cors, etc.)

---

## 🏃 Running the App

### Option 1: Run Both Frontend + Backend Together (RECOMMENDED)

```bash
npm run dev
```

This will start:
- ✅ **Frontend:** http://localhost:8080/ (Vite dev server)
- ✅ **Backend:** http://localhost:5000/ (Express API)

Both run simultaneously in your terminal.

### Option 2: Run Separately

**Terminal 1 - Frontend Only:**
```bash
npm run dev:frontend
```

**Terminal 2 - Backend Only:**
```bash
npm run dev:backend
```

### Option 3: Backend Only (Standalone)

```bash
npm run server
# or
npm start
```

---

## 🔧 Backend API Endpoints

### 1. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Background removal API is running"
}
```

---

### 2. Remove Background
```
POST /webhook/remove-bg
Content-Type: multipart/form-data

Form Data:
- image: <file> (JPG, PNG, or WEBP, max 10MB)
```

**Success Response (200):**
```json
{
  "success": true,
  "url": "https://...", 
  "fileName": "image.jpg",
  "fileType": "image/jpeg",
  "timestamp": "2026-03-14T12:00:00.000Z"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "details": "Additional details (development only)"
}
```

---

### 3. Download Image (CORS Proxy)
```
GET /download-image?url=<encoded-url>
```

Returns the image file with proper CORS headers.

---

## 📝 Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (8080)           │
│  UploadZone.tsx - Image Upload UI       │
└─────────────────┬───────────────────────┘
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────┐
│       Express Backend API (5000)        │
│  server.js - Request Handling            │
│  - File upload validation               │
│  - CORS headers management              │
│  - Error handling & logging             │
└─────────────────┬───────────────────────┘
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────┐
│      n8n Webhook                        │
│  https://pankaj-bot.../webhook/...      │
│  - Background removal processing        │
│  - Image URL generation                 │
└─────────────────────────────────────────┘
```

---

## 🧪 Testing the API

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"ok","message":"Background removal API is running"}
```

---

### Test 2: Remove Background (with File)
```bash
# Using curl
curl -X POST http://localhost:5000/webhook/remove-bg \
  -F "image=@/path/to/image.jpg"

# Using HTTPie
http -f POST localhost:5000/webhook/remove-bg \
  image@/path/to/image.jpg
```

Expected response:
```json
{
  "success": true,
  "url": "https://processed-image-url...",
  "fileName": "image.jpg",
  "fileType": "image/jpeg",
  "timestamp": "2026-03-14T12:00:00.000Z"
}
```

---

## 🔐 Environment Variables

### Development (.env.development)
```
VITE_API_URL=http://localhost:5000
```

### Production (.env.production)
```
VITE_API_URL=https://clearcut-ai-api.vercel.app
```

---

## 🚀 Deployment

### Local Development
```bash
npm run dev
# Frontend: http://localhost:8080/
# Backend: http://localhost:5000/
```

### Production on Vercel

**Frontend (React app):**
1. Push to GitHub
2. Vercel auto-deploys to `https://clearcut-ai-kappa.vercel.app/`

**Backend (Node.js server):**

Option A: Deploy to Vercel (Serverless)
```bash
# Add vercel.json
# Push to GitHub
# Vercel creates serverless functions
```

Option B: Deploy to Heroku
```bash
heroku create clearcut-ai-api
git push heroku main
```

Option C: Deploy to Railway / Render
Similar to Heroku - connect GitHub repo.

---

## 📋 File Structure

```
clearcut-ai/
├── server.js                    ← Backend API (NEW)
├── .env.development             ← Dev API URL (NEW)
├── .env.production              ← Prod API URL (NEW)
├── .env.local                   ← Google OAuth credentials
├── package.json                 ← Updated with backend deps
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       └── UploadZone.tsx   ← Updated to use /webhook/remove-bg
│   └── ...
├── vite.config.ts
└── ...
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: "Port 5000 already in use"**
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or use different port
PORT=5001 npm run server
```

---

### CORS Errors Still Appearing

**Error: "CORS policy: cross-origin request blocked"**

This shouldn't happen now, but if it does:

1. Ensure backend is running: `npm run dev`
2. Check frontend is calling `/webhook/remove-bg` (not direct n8n URL)
3. Look at browser console (F12) for actual error
4. Check backend logs for details

---

### Upload Hangs or Times Out

**Slow responses or "Processing..." stuck:**

1. Check backend is running: `curl http://localhost:5000/health`
2. Check n8n webhook is accessible: 
   ```bash
   curl -X POST https://pankaj-bot.app.n8n.cloud/webhook/background_remover \
     -F "image=@test-image.jpg"
   ```
3. Try with smaller image (< 1MB)
4. Check browser DevTools Network tab for request details

---

### Backend Logs Not Showing

Add this to see detailed logs:
```bash
NODE_DEBUG=* npm run dev:backend
```

---

## 🔄 Workflow

### User Uploads Image

1. User clicks upload or drags image
2. Frontend validates file (size, type)
3. Frontend sends POST to `http://localhost:5000/webhook/remove-bg`
4. Backend receives FormData with image
5. Backend uploads to n8n webhook
6. n8n processes image, returns URL
7. Backend sends URL back to frontend
8. Frontend displays processed image
9. User can download

**All in ~5-30 seconds!**

---

## 💾 Database (Optional Future)

Currently using localStorage for history. To add a real database:

```javascript
// Example: Add MongoDB
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: String,
  originalUrl: String,
  processedUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);
```

---

## 🎯 Next Steps

1. ✅ **Run the app:**
   ```bash
   npm run dev
   ```

2. ✅ **Test upload:**
   - Go to http://localhost:8080/
   - Upload an image
   - Click "Remove Background"
   - Should work! ✨

3. ✅ **Deploy:**
   - Push to GitHub
   - Frontend auto-deploys to Vercel
   - Deploy backend separately (Heroku, Railway, etc.)
   - Update `.env.production` with backend URL

---

## 📞 Support

If something doesn't work:

1. **Check logs:**
   ```bash
   # Frontend logs appear in browser console (F12)
   # Backend logs appear in terminal
   ```

2. **Verify connectivity:**
   ```bash
   curl http://localhost:5000/health
   ```

3. **Check files were updated:**
   ```bash
   grep "webhook/remove-bg" src/components/dashboard/UploadZone.tsx
   ```

---

## ✨ You're All Set!

Your app now has:
- ✅ Secure backend API
- ✅ CORS handling
- ✅ Error handling & logging
- ✅ File validation
- ✅ Production-ready architecture

**Run it now:**
```bash
npm run dev
```

Then visit: **http://localhost:8080/** 🎉
