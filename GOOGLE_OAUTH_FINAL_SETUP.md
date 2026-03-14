# 🔐 Google OAuth Final Setup - Complete Instructions

## Status: ✅ Code Ready | ⚠️ Google Cloud Configuration Needed

Your application code is **100% ready**. Now you need to complete the Google Cloud setup to make OAuth work.

---

## 🎯 What Needs to Be Done

The OAuth error `Error 401: invalid_client` occurs because:
1. ❌ Redirect URIs not added to Google Cloud credentials
2. ❌ App in "Testing" mode needs authorized test users added

**Fix takes 5 minutes!** Follow the steps below.

---

## 📋 Step-by-Step Configuration

### Step 1: Open Google Cloud Console

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Sign in with your Google account (if not already signed in)
3. Make sure you're in the **ZeroBG** project (top dropdown)

### Step 2: Edit OAuth Client

1. Find the credential named **"ZeroBG"** (Web application)
2. Click on it to open the details
3. Click the **"Edit"** button (pencil icon on the right)

### Step 3: Add All Redirect URIs

In the **"Authorized redirect URIs"** section, add all these URLs (remove any that are already there and start fresh):

```
http://localhost:8080
http://localhost:5173
http://localhost:3000
https://clearcut-ai-kappa.vercel.app
https://clearcut-ai-kappa.vercel.app/login
https://clearcut-ai-kappa.vercel.app/register
```

**Why multiple localhost ports?** Different tools use different ports - this ensures compatibility.

**How to add them:**
1. Click in the text field
2. Paste the first URL
3. Press **Enter** or click the **"+"** button
4. Repeat for each URL

### Step 4: Save Changes

1. Click **SAVE** at the bottom
2. You'll see a confirmation: **"Updated Web client"**
3. **IMPORTANT:** Wait **5-10 minutes** for Google to process the changes

### Step 5: Add Test User (if keeping "Testing" mode)

Since your app is in "Testing" mode, only authorized users can sign in. Add your test user:

1. In the same Google Cloud Console, go to **"OAuth consent screen"** (left sidebar)
2. Scroll down to **"Test users"** section
3. Click **"+ ADD USERS"**
4. Enter email: `killergamingyt677@gmail.com`
5. Click **ADD**
6. Click **SAVE** (at the top if needed)

---

## 🧪 Testing OAuth

### After Google Processing (5-10 minutes)

**Test 1: Local Development**
```bash
# Run the dev server
npm run dev
# Open: http://localhost:8080/
# Click "Sign In" or "Sign Up"
# Click "Sign in with Google"
# You should see the Google consent screen
# Accept and you'll be redirected to the dashboard
```

**Test 2: Production (Vercel)**
```
Visit: https://clearcut-ai-kappa.vercel.app/
Click "Sign In" or "Sign Up"
Click "Sign in with Google"
Should work the same as local
```

### Expected Flow:
1. Click Google button → Google consent screen appears
2. Accept → Redirected to dashboard
3. See "Upload & Remove Background" tab active
4. User profile shows in localStorage
5. Upload/history features work

### If Still Getting Error:
1. Check you waited 5-10 minutes after saving URIs
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Check `.env.local` contains: `VITE_GOOGLE_CLIENT_ID=1021577977508-mb5383a0gv47dpg7m9fpr8231fihbu3s.apps.googleusercontent.com`
4. Restart dev server: `npm run dev`

---

## 📦 What's Already Configured

✅ **Code:** All OAuth components implemented (Login.tsx, Register.tsx, auth.ts)
✅ **Environment:** `.env.local` has correct Client ID
✅ **Dependencies:** `@react-oauth/google` installed
✅ **Provider:** GoogleOAuthProvider wrapping app in main.tsx
✅ **Storage:** User data auto-saved to localStorage
✅ **Redirect:** Auto-redirect to dashboard after login

---

## 🚀 Application Features

Once OAuth is working, you have:

### Upload & Remove Background
- Drag-drop or click to upload images
- Automatic binary upload to n8n webhook
- Image processing
- Automatic blob download (no redirect)
- Success/error notifications

### History Tab
- View all previously processed images
- Download any image from history
- Delete individual images
- Clear all history with confirmation
- Persistent storage across sessions

### Authentication
- Google OAuth login/signup
- Email/password demo login (for testing)
- Automatic token parsing and storage
- 1-hour token expiration
- Logout functionality
- Protected dashboard (redirects to login if not authenticated)

### Deployment
- Local development on `http://localhost:8080/`
- Production on `https://clearcut-ai-kappa.vercel.app/`
- GitHub repository: `killergamingyt677-ui/clearcut-ai`
- Auto-deploy on git push to main branch

---

## 📱 Environment Details

**Development:**
- Framework: React 18 + TypeScript
- Build tool: Vite
- Port: 8080 (configurable)
- Database: Browser localStorage
- Styling: Tailwind CSS + shadcn/ui

**Production:**
- Hosting: Vercel (auto-deployed from GitHub)
- Backend: n8n webhook for image processing
- Authentication: Google OAuth 2.0
- Domain: https://clearcut-ai-kappa.vercel.app

---

## 🔧 Troubleshooting

### Q: Why do I need multiple redirect URIs?
A: Different ports might be used locally or for different builds. Having them all ensures OAuth works regardless of which port is running.

### Q: Why the 5-10 minute wait?
A: Google needs time to propagate configuration changes across their servers. This is normal.

### Q: Can I remove "Testing" mode?
A: Yes, but requires app verification which takes 24-48 hours. Contact support if you need this.

### Q: Why is `.env.local` in `.gitignore`?
A: It contains sensitive credentials. Each machine should have its own `.env.local`. In Vercel, we configure it in project settings instead.

---

## ✅ Verification Checklist

Before marking setup complete:

- [ ] Added all 6 redirect URIs in Google Cloud
- [ ] Clicked SAVE in Google Cloud
- [ ] Waited 5-10 minutes
- [ ] Added test user `killergamingyt677@gmail.com` in OAuth consent screen
- [ ] Dev server running: `npm run dev`
- [ ] Can access `http://localhost:8080/` in browser
- [ ] Google signin button appears on login page
- [ ] Clicking Google button shows consent screen
- [ ] After consent, redirected to dashboard
- [ ] Upload tab and History tab visible
- [ ] Can upload image and remove background
- [ ] Processed image appears in history
- [ ] Can download processed image
- [ ] Same experience on `https://clearcut-ai-kappa.vercel.app/`

---

## 📞 Need Help?

If OAuth still isn't working after following these steps:

1. **Clear browser cache:** Cmd+Shift+Delete (open DevTools → Storage → Clear all)
2. **Check Google Cloud:** Verify URIs are exactly as shown above (no trailing slashes)
3. **Restart everything:**
   - Stop dev server: `Ctrl+C`
   - Run: `npm run dev`
   - Open browser in private/incognito mode
   - Try signin again

4. **Check console errors:** Open DevTools (F12) → Console → Look for red errors

---

## 🎉 Success!

Once OAuth is configured, you'll have a fully functional background removal web app with:
- ✅ User authentication
- ✅ Image processing
- ✅ History tracking
- ✅ Persistent storage
- ✅ Production deployment
- ✅ Version control

Enjoy! 🚀
