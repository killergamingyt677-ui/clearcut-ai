# 🎯 COMPLETE GOOGLE AUTHENTICATION SETUP - FULL INFORMATION

---

## 📌 WHAT WAS IMPLEMENTED

Your app now has **full Google OAuth authentication** with:
- ✅ Google Login/Signup buttons
- ✅ Automatic user data storage
- ✅ Data persistence (survives page refresh)
- ✅ Background removal history tracking
- ✅ Email/password demo login option

---

## 🔐 STEP 1: GET YOUR GOOGLE CLIENT ID

### A. Create Google Cloud Project

**URL:** https://console.cloud.google.com/

1. Click **"Select a Project"** (top left)
2. Click **"NEW PROJECT"**
3. Project name: `ZeroBG`
4. Click **"CREATE"** and wait ~30 seconds

### B. Enable Google+ API

1. In search bar at top, type: `Google+ API`
2. Click on **"Google+ API"** result
3. Click **"ENABLE"** button

### C. Create OAuth Credentials

1. Left sidebar → **"Credentials"**
2. **"+ CREATE CREDENTIALS"** button
3. Select **"OAuth client ID"**
4. If asked for consent screen: Click **"CONFIGURE CONSENT SCREEN"**

### D. Configure OAuth Consent Screen

1. User Type: **"External"**
2. Click **"CREATE"**
3. Fill in:
   - **App name:** ZeroBG
   - **User support email:** your-email@gmail.com
   - **Developer contact email:** your-email@gmail.com
4. Keep clicking **"SAVE AND CONTINUE"** (skip optional fields)
5. Click **"BACK TO DASHBOARD"**

### E. Get Your Client ID

1. **"Credentials"** → **"+ CREATE CREDENTIALS"**
2. **"OAuth client ID"**
3. Application type: **"Web application"**
4. Under **"Authorized redirect URIs"**, click **"+ ADD URI"** and add:
   ```
   http://localhost:5173
   http://localhost:3000
   https://clearcut-ai-kappa.vercel.app
   https://clearcut-ai-kappa.vercel.app/login
   https://clearcut-ai-kappa.vercel.app/register
   ```
5. Click **"CREATE"**
6. **COPY YOUR CLIENT ID** from the popup! 📋

---

## 💾 STEP 2: STORE CLIENT ID IN YOUR PROJECT

### Create `.env.local` file

In your project root directory (`/Users/panka/Background Remover /clearcut-ai/`):

Create file: `.env.local`

```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

Replace `YOUR_CLIENT_ID_HERE` with the Client ID you just copied.

**Example:**
```env
VITE_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

---

## 📍 WHERE IS DATA STORED?

### Storage Location: Browser's LocalStorage

LocalStorage is a **browser database** that stores data locally on the user's computer. It persists even after:
- Page refresh ✅
- Browser close ✅
- Computer restart ✅

### Data Structure

```
Browser LocalStorage
├── zerobg_user
│   ├── id: "1234567890"
│   ├── email: "user@gmail.com"
│   ├── name: "John Doe"
│   ├── picture: "https://..."
│   └── loginTime: "2026-03-14T10:30:00.000Z"
├── zerobg_token
│   └── eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
├── zerobg_token_expiry
│   └── 1710417000000
└── bgRemovalHistory
    ├── [0] {id, fileName, processedUrl, timestamp}
    ├── [1] {id, fileName, processedUrl, timestamp}
    └── [N] {...}
```

---

## 🔑 HOW TO ACCESS STORED DATA

### Method 1: In Browser Console

1. Press **F12** (Open DevTools)
2. Go to **"Console"** tab
3. Run these commands:

```javascript
// Get user data
const user = JSON.parse(localStorage.getItem('zerobg_user'));
console.log(user);
// Output: {id: "...", email: "...", name: "...", picture: "..."}

// Get token
const token = localStorage.getItem('zerobg_token');
console.log(token);
// Output: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

// Get background removal history
const history = JSON.parse(localStorage.getItem('bgRemovalHistory'));
console.log(history);
// Output: [{id: 123, fileName: "...", ...}, ...]

// Check if user is logged in
console.log(localStorage.getItem('zerobg_user') !== null);
// Output: true or false
```

### Method 2: In Browser UI

1. Press **F12**
2. Go to **"Application"** tab
3. Left sidebar → **"Local Storage"**
4. Click on **"http://localhost:5173"** (or your domain)
5. You'll see all stored data!

### Method 3: In Your React Code

```typescript
import { getUserData, isAuthenticated, getAuthToken } from '@/lib/auth';

export function MyComponent() {
  const user = getUserData();
  const loggedIn = isAuthenticated();
  const token = getAuthToken();

  return (
    <div>
      <p>Logged in: {loggedIn ? 'Yes' : 'No'}</p>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.picture} />
        </>
      )}
    </div>
  );
}
```

---

## 📊 COMPLETE DATA FLOW

```
┌─────────────────────────────────────────────────────────┐
│ User Visits Your Website                                │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ User Clicks "Sign in with Google"                       │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ Google OAuth Dialog Appears                             │
│ (User selects their Google account)                     │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ Google Returns JWT Token + User Info                    │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ Your App Decodes JWT Token                              │
│ Extracts: id, email, name, picture                      │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ Your App Stores Data in LocalStorage:                   │
│ - zerobg_user (user profile)                            │
│ - zerobg_token (JWT token)                              │
│ - zerobg_token_expiry (expires in 1 hour)               │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ User Redirected to Dashboard ✅                         │
│ (User is now logged in)                                 │
└─────────────────┬───────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────┐
│ User Can Now:                                           │
│ 1. Upload images                                        │
│ 2. Remove backgrounds                                   │
│ 3. Download images                                      │
│ 4. View history (all saved locally)                     │
│ 5. Refresh page - data still there! ✅                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 TESTING LOCALLY

### Step 1: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
# Then run:
npm run dev
```

### Step 2: Visit Login Page
```
http://localhost:5173/login
```

### Step 3: Test Google OAuth
1. Click **"Sign in with Google"**
2. Select your Google account
3. Authorize
4. You should be redirected to dashboard!

### Step 4: Verify Data Storage
1. Press **F12**
2. Go to **"Console"** tab
3. Run: `JSON.parse(localStorage.getItem('zerobg_user'))`
4. You should see your user data!

### Step 5: Test Persistence
1. Press **F5** to refresh page
2. You should still be logged in! ✅
3. Your data is still in localStorage

---

## 🚀 DEPLOY TO VERCEL

### Step 1: Add Environment Variable

1. Go to: https://vercel.com/dashboard
2. Click your project: `clearcut-ai`
3. Go to **"Settings"** tab
4. Go to **"Environment Variables"**
5. Click **"Add New"**
6. Name: `VITE_GOOGLE_CLIENT_ID`
7. Value: `YOUR_CLIENT_ID`
8. Click **"Save"**

### Step 2: Add Redirect URI to Google Cloud

1. Go to: https://console.cloud.google.com/
2. Go to **"Credentials"**
3. Click your OAuth app
4. Under **"Authorized redirect URIs"**, add:
   ```
   https://clearcut-ai-kappa.vercel.app
   ```
5. Click **"Save"**

### Step 3: Deploy
```bash
git add .
git commit -m "Deploy with Google OAuth"
git push
```

Vercel will automatically deploy! ✅

---

## 📁 FILES INVOLVED

| File | Purpose |
|------|---------|
| `.env.local` | Stores Google Client ID (local only) |
| `src/lib/auth.ts` | Authentication utilities & localStorage functions |
| `src/main.tsx` | Wraps app with GoogleOAuthProvider |
| `src/pages/Login.tsx` | Login page with Google button |
| `src/pages/Register.tsx` | Signup page with Google button |

---

## 🔧 API FUNCTIONS

### `storeUserData(userData, token)`
Saves user and token to localStorage.

```typescript
storeUserData({
  id: "123",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://...",
  loginTime: new Date().toISOString(),
}, token);
```

### `getUserData()`
Get stored user profile.
```typescript
const user = getUserData();
// {id, email, name, picture, loginTime}
```

### `getAuthToken()`
Get stored JWT token (null if expired).
```typescript
const token = getAuthToken();
```

### `isAuthenticated()`
Check if user is logged in.
```typescript
if (isAuthenticated()) {
  // Show dashboard
}
```

### `logout()`
Clear all data and redirect to home.
```typescript
logout(); // Clears storage and redirects
```

### `clearAuthData()`
Remove all auth-related localStorage keys.
```typescript
clearAuthData();
```

### `parseGoogleToken(token)`
Decode JWT token to get user info.
```typescript
const decoded = parseGoogleToken(token);
// {sub, email, name, picture, ...}
```

---

## ⏰ TOKEN EXPIRATION

- **Expires After:** 1 hour (3600 seconds)
- **What Happens:** User needs to login again
- **Why:** Security - prevents misuse if device is compromised

---

## ❓ COMMON QUESTIONS

### Q: Where is my data stored?
**A:** In browser's LocalStorage on the user's device. Not on any server.

### Q: Is my data secure?
**A:** Yes! Google handles password securely. JWT token is signed and only 1 hour valid.

### Q: Will data persist after I close the browser?
**A:** Yes! LocalStorage survives browser close. Only cleared when user logs out or manually clears browser cache.

### Q: What if I have multiple tabs open?
**A:** All tabs share the same LocalStorage, so user stays logged in across all tabs!

### Q: Can I access this data in the backend?
**A:** Not directly. You'd need to send it via API. Currently it's client-side only.

### Q: How much data can I store?
**A:** ~5-10 MB per domain in LocalStorage. Should be plenty for user profile + history.

---

## 🎓 SUMMARY

1. ✅ You have Google OAuth setup
2. ✅ User data is stored in browser's LocalStorage
3. ✅ Data persists after page refresh
4. ✅ Token expires after 1 hour (security)
5. ✅ History of background removals is saved
6. ✅ Can be deployed to Vercel

**Your app is now fully authenticated!** 🚀

---

## 📞 SUPPORT CHECKLIST

If something doesn't work:

- [ ] Check `.env.local` has correct Client ID
- [ ] Check browser console (F12) for errors
- [ ] Check redirect URIs are added in Google Cloud Console
- [ ] Restart dev server after adding `.env.local`
- [ ] Check if cookies/localStorage are enabled in browser
- [ ] Try in incognito/private mode

---

**All done! Your authentication system is ready! 🎉**
