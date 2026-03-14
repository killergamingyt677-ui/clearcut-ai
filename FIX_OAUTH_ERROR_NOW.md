# ✅ OAuth Error Fix - Action Required

## Current Issue
You got error during signup on the website with `flowName=GeneralOAuthFlow`

## Root Cause
Your Google Cloud OAuth configuration is incomplete. The app doesn't know where to redirect users after they authenticate.

---

## 🚀 Fix This Now (Takes 5 Minutes)

### Step 1️⃣: Open Google Cloud Console
Go to: **https://console.cloud.google.com/apis/credentials**

Make sure you're signed in with your Google account!

---

### Step 2️⃣: Edit OAuth Client Configuration

1. You should see "ZeroBG" Web application client
2. Click on it to open details
3. Click the **Edit** button (pencil icon)

---

### Step 3️⃣: Add Redirect URIs

Look for "Authorized redirect URIs" section.

**Clear existing URIs and add these 6:**
```
http://localhost:8080
http://localhost:5173
http://localhost:3000
https://clearcut-ai-kappa.vercel.app
https://clearcut-ai-kappa.vercel.app/login
https://clearcut-ai-kappa.vercel.app/register
```

**How to add them:**
- Click in the text field
- Paste first URI
- Press Enter or click "+" button
- Repeat for each URI

---

### Step 4️⃣: Save Changes

Click **SAVE** button at the bottom of the page.

You'll see: "Updated Web client" ✅

---

### Step 5️⃣: Wait 5-10 Minutes

⏳ **This is important!** Google needs time to update their servers.

Set a timer for 5 minutes and wait.

---

### Step 6️⃣: Add Your Test User

While waiting, complete this:

1. Same page → Look for "OAuth consent screen" (left sidebar)
2. Scroll down to **"Test users"** section
3. Click **"+ ADD USERS"**
4. Enter email: `killergamingyt677@gmail.com`
5. Click **ADD**
6. Make sure it says "test user" next to your email

---

### Step 7️⃣: Clear Browser Cache & Restart

After 5 minutes:

**In browser:**
1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Open DevTools: Press `F12`
3. Go to Application → Storage → Local Storage
4. Click your domain
5. Click "Clear All"

**In terminal:**
```bash
# Stop dev server: Ctrl+C
# Restart it:
npm run dev
```

---

### Step 8️⃣: Test OAuth

**Test on Local:**
1. Open: http://localhost:8080/
2. Click "Sign Up"
3. Click "Sign in with Google" button
4. You should see Google consent screen
5. Select account and continue
6. Should redirect to dashboard ✅

**Test on Production:**
1. Open: https://clearcut-ai-kappa.vercel.app/
2. Click "Sign Up"
3. Click "Sign in with Google" button
4. Should work same as local ✅

---

## ⚠️ If Still Getting Error

### Troubleshoot Step 1: Verify Redirect URIs Were Saved
1. Go to https://console.cloud.google.com/apis/credentials
2. Click your OAuth client again
3. **Verify all 6 URIs are listed** (no missing ones)
4. If any are missing, add them again and SAVE

### Troubleshoot Step 2: Check Client ID
1. Verify `.env.local` file has: 
   ```
   VITE_GOOGLE_CLIENT_ID=1021577977508-mb5383a0gv47dpg7m9fpr8231fihbu3s.apps.googleusercontent.com
   ```
2. If different, update it
3. Restart dev server: `npm run dev`

### Troubleshoot Step 3: Check Browser Console
1. Open: http://localhost:8080/
2. Press `F12` (DevTools)
3. Go to **Console** tab
4. Click Google button
5. Look for red error messages
6. Screenshot the error and share

### Troubleshoot Step 4: Try Incognito Mode
1. Open incognito/private browser window
2. Go to http://localhost:8080/
3. Try signing in again
4. (Clears all cache and cookies)

---

## 📋 Verification Checklist

Before testing, verify:

- [ ] You've added all 6 redirect URIs in Google Cloud
- [ ] You clicked SAVE in Google Cloud
- [ ] You waited 5-10 minutes
- [ ] You added test user email in OAuth consent screen
- [ ] You hard refreshed browser (Cmd+Shift+R)
- [ ] You cleared browser localStorage
- [ ] You restarted dev server (Ctrl+C then npm run dev)
- [ ] .env.local has correct Client ID

---

## 🎉 Success = This Flow

When OAuth is working correctly:

```
1. You're on login/signup page
   ↓
2. Click "Sign in with Google" button
   ↓
3. Google consent screen appears
   ↓
4. You select your Google account
   ↓
5. Redirected to /dashboard
   ↓
6. You see "Upload & Remove Background" tab
   ↓
7. Your email/name shows in profile
   ↓
8. Data saved in browser localStorage
```

If this happens → **OAuth is working!** ✅

---

## 🎓 Why This Happens

**OAuth Security Flow:**
1. Your app says: "User wants to login with Google"
2. Google says: "OK, what app is this?"
3. Google checks the app's registered redirect URIs
4. If your app's domain isn't in the list → Error!
5. This prevents malicious apps from stealing credentials

**Testing Mode:**
- Your app is in "Testing" mode (not published)
- Only specific people can use it
- You add their emails as "test users"
- This is fine for development
- When ready to launch, you publish the app

---

## 📚 More Info

See these files for detailed information:
- `GOOGLE_OAUTH_FINAL_SETUP.md` - Full detailed setup
- `OAUTH_ERROR_TROUBLESHOOTING.md` - Complete troubleshooting
- `QUICK_START.md` - Quick reference
- `DEPLOYMENT_STATUS.md` - Project overview

---

## ✨ After OAuth Works

Once OAuth is fixed and working:

1. ✅ Can login/signup with Google account
2. ✅ User data persists in localStorage
3. ✅ Can upload images to dashboard
4. ✅ Images process via n8n webhook
5. ✅ Processed images appear in History
6. ✅ Can download processed images
7. ✅ All features fully functional!

---

## 🚀 Deploy to Production

When ready to show others:

```bash
# Make changes
git add .
git commit -m "Your message"
git push

# Auto-deploys to: https://clearcut-ai-kappa.vercel.app/
# Takes 2-3 minutes to deploy
```

---

**Start with Step 1 above and follow through Step 8. You'll have working OAuth!** 🎉

