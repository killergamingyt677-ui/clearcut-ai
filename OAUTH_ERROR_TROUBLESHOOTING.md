# 🔧 OAuth Error Troubleshooting Guide

## Error: "flowName=GeneralOAuthFlow"

This is a Google OAuth configuration error. Here's how to fix it:

---

## 🎯 Common Causes & Solutions

### Cause 1: Redirect URIs Not Configured ❌

**Symptom:** Error appears on both localhost and production

**Fix:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Web Application client
3. Click Edit
4. Scroll to "Authorized redirect URIs"
5. Add ALL these URIs:
   - `http://localhost:8080`
   - `http://localhost:5173`
   - `http://localhost:3000`
   - `https://clearcut-ai-kappa.vercel.app`
   - `https://clearcut-ai-kappa.vercel.app/login`
   - `https://clearcut-ai-kappa.vercel.app/register`
6. Click SAVE
7. **WAIT 5-10 MINUTES** for changes to propagate
8. Clear browser cache: `Cmd+Shift+Delete`
9. Try again

---

### Cause 2: App in Testing Mode Without Test User ❌

**Symptom:** Works for some users but not others

**Fix:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Click "OAuth consent screen" in left sidebar
3. Scroll to "Test users" section
4. Click "+ ADD USERS"
5. Enter your Google account email: `killergamingyt677@gmail.com`
6. Click ADD
7. Try logging in with that email account

---

### Cause 3: OAuth Consent Screen Not Configured ❌

**Symptom:** "Consent screen configuration is incomplete" error

**Fix:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Click "OAuth consent screen" in left sidebar
3. Make sure "User Type" is set to "External"
4. Fill in required fields:
   - **App name:** ZeroBG
   - **User support email:** killergamingyt677@gmail.com
   - **Developer contact:** killergamingyt677@gmail.com
5. Click SAVE AND CONTINUE
6. You may see "Scopes" page - just click SAVE AND CONTINUE again
7. Review and click BACK TO DASHBOARD

---

### Cause 4: Stale Browser Cache ❌

**Symptom:** Error persists even after fixing configuration

**Fix:**
1. **Hard refresh browser:**
   - Mac: `Cmd+Shift+R`
   - Windows: `Ctrl+Shift+R`
2. **Clear localStorage:**
   - Press F12 (open DevTools)
   - Go to Application → Storage → Local Storage
   - Click the domain and delete all
3. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

### Cause 5: Wrong Client ID ❌

**Symptom:** "invalid_client" error

**Fix:**
1. Check `.env.local` has the correct Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=1021577977508-mb5383a0gv47dpg7m9fpr8231fihbu3s.apps.googleusercontent.com
   ```
2. Verify it matches Google Cloud Console:
   - Go to https://console.cloud.google.com/apis/credentials
   - Check the Client ID shown matches exactly
3. If different, update `.env.local` and restart dev server

---

## ✅ Step-by-Step Fix (Quick Path)

If you're getting "GeneralOAuthFlow" error right now, do this:

### Step 1: Configure Redirect URIs (3 minutes)
```
Go to: https://console.cloud.google.com/apis/credentials
→ Edit OAuth client
→ Add all 6 URIs above
→ SAVE
→ Wait 5-10 minutes
```

### Step 2: Add Test User (2 minutes)
```
Same page → OAuth consent screen
→ Test users section
→ ADD USERS
→ killergamingyt677@gmail.com
→ SAVE
```

### Step 3: Clear Everything (1 minute)
```
Browser:
- Hard refresh: Cmd+Shift+R
- DevTools → Application → Clear local storage

Terminal:
- Ctrl+C to stop dev server
- npm run dev to restart
```

### Step 4: Test
```
Try logging in again on:
- http://localhost:8080/ (local)
- https://clearcut-ai-kappa.vercel.app/ (production)
```

---

## 🔍 Debugging: Check Your Setup

### Check 1: Client ID is Set
```bash
# In project terminal, run:
grep VITE_GOOGLE_CLIENT_ID .env.local
# Should show the full client ID
```

### Check 2: Google Cloud Configuration
1. Open https://console.cloud.google.com/apis/credentials
2. Click your OAuth client (ZeroBG)
3. Verify these sections are filled:
   - ✅ Client ID: `1021577977508-mb5383a0gv47dpg7m9fpr8231fihbu3s.apps.googleusercontent.com`
   - ✅ Authorized redirect URIs: All 6 URIs listed
   - ✅ JavaScript origins: Should have your domain

### Check 3: Browser Console for Errors
1. Open browser DevTools: Press F12
2. Go to Console tab (not Network)
3. Try clicking the Google login button
4. Look for red error messages
5. Screenshot and check what it says

### Check 4: localStorage is Accessible
In DevTools Console, run:
```javascript
// Should not throw error
localStorage.setItem('test', 'value');
localStorage.getItem('test');
localStorage.removeItem('test');
```

---

## 📱 Device-Specific Issues

### Mobile Device?
- Redirect URIs must match exact domain
- Can't use localhost on phone
- Only works with https://clearcut-ai-kappa.vercel.app
- Make sure you're added as test user

### Different Browsers?
- Try Chrome first (best support)
- Clear cache in each browser
- Try incognito mode

### VPN/Proxy?
- Temporarily disable if possible
- Sometimes blocks OAuth flow
- Try on different network

---

## 🎓 Understanding the Error

**"GeneralOAuthFlow" means:**
- Google's OAuth system detected a configuration issue
- It's not a code error - it's a setup error
- Always due to redirect URI mismatch or consent screen issue
- Fix is always in Google Cloud Console

**Why it happens:**
- You clicked Google button → App sends request to Google
- Google looks up your app configuration
- Redirect URI doesn't match what's configured → Error
- OR User isn't authorized to test app → Error

---

## ✨ Quick Validation Checklist

After following fixes, verify:

- [ ] Can access http://localhost:8080/
- [ ] Can access https://clearcut-ai-kappa.vercel.app/
- [ ] Google button appears on login page
- [ ] Clicking Google button shows Google consent screen
- [ ] Can select account to sign in with
- [ ] After selecting account, redirected to dashboard
- [ ] Your user profile visible in localStorage
- [ ] Can upload image successfully
- [ ] Processed image appears in History tab
- [ ] Can download image from History

---

## 🚨 Still Not Working?

Try these advanced steps:

### Option 1: Publish the App
Instead of testing mode, publish the app:
1. Google Cloud → OAuth consent screen → Publish
2. Requires app verification (24-48 hours)
3. Then anyone can use it

### Option 2: Use Backend Authentication
Instead of client-side OAuth, use a backend:
1. Create Node.js/Express server
2. Handle OAuth exchange on backend
3. Return JWT to frontend
4. More secure but more complex

### Option 3: Alternative Auth
Use alternative providers:
- Firebase Authentication
- Auth0
- Clerk
- NextAuth.js

---

## 📞 Getting Help

When asking for help, provide:
1. Exact error message (take screenshot)
2. Which step you're on (localhost or production?)
3. Output of: `grep VITE_GOOGLE_CLIENT_ID .env.local`
4. Browser DevTools console errors (F12 → Console)
5. What you've already tried

---

## 🎉 Success Looks Like

When it's working:
1. Click Google button
2. Google consent screen appears
3. Select your account
4. Redirected to /dashboard
5. See "Upload & Remove Background" tab
6. Can upload images
7. Can see history
8. Can download processed images

**That's the full working OAuth flow!**

---

## 📚 Related Documentation

- `GOOGLE_OAUTH_FINAL_SETUP.md` - Full setup guide
- `QUICK_START.md` - Quick reference
- `DEPLOYMENT_STATUS.md` - Project status
- `AUTHENTICATION_GUIDE.md` - Auth system details

