# Google Authentication Setup Guide

## 📋 Table of Contents
1. [How to Get Google Client ID](#how-to-get-google-client-id)
2. [Data Storage Information](#data-storage-information)
3. [How to Access User Data](#how-to-access-user-data)
4. [File Structure](#file-structure)
5. [API Reference](#api-reference)

---

## 🔐 How to Get Google Client ID

### Step 1: Create a Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click **"Select a Project"** at the top
3. Click **"NEW PROJECT"**
4. Enter name: `ZeroBG`
5. Click **"CREATE"**
6. Wait for the project to be created

### Step 2: Enable Google+ API

1. In the top search bar, type **"Google+ API"**
2. Click on **"Google+ API"**
3. Click **"ENABLE"**
4. Wait a few seconds for it to enable

### Step 3: Create OAuth 2.0 Credentials

1. Go to **"Credentials"** (left sidebar)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. You'll see: "To create an OAuth client ID, you first need to set up your OAuth consent screen"
5. Click **"CONFIGURE CONSENT SCREEN"**

### Step 4: Configure OAuth Consent Screen

1. Select **"External"** for user type
2. Click **"CREATE"**
3. Fill in the form:
   - **App name:** ZeroBG
   - **User support email:** your-email@gmail.com
   - **Developer contact:** your-email@gmail.com
4. Click **"SAVE AND CONTINUE"**
5. On the next pages, keep clicking **"SAVE AND CONTINUE"** (you can skip optional fields)
6. Finally click **"BACK TO DASHBOARD"**

### Step 5: Get Your Client ID

1. Go to **"Credentials"** (left sidebar)
2. Click **"+ CREATE CREDENTIALS"** again
3. Select **"OAuth client ID"**
4. Choose **"Web application"**
5. Under **"Authorized redirect URIs"**, add:
   ```
   http://localhost:5173
   http://localhost:3000
   https://clearcut-ai-kappa.vercel.app
   https://clearcut-ai-kappa.vercel.app/login
   https://clearcut-ai-kappa.vercel.app/register
   ```
6. Click **"CREATE"**
7. A popup will show your **Client ID** - **COPY THIS!**

---

## 💾 Data Storage Information

### Where is User Data Stored?

**Browser's LocalStorage** - All user authentication data is stored in your browser's local storage:

```
localStorage keys:
- zerobg_user (User profile data)
- zerobg_token (Google JWT token)
- zerobg_token_expiry (Token expiration time)
- bgRemovalHistory (Background removal history)
```

### What Data is Stored?

When a user logs in with Google, the following data is saved:

```javascript
{
  "zerobg_user": {
    "id": "1234567890",              // Google user ID
    "email": "user@gmail.com",       // Email address
    "name": "John Doe",              // Full name from Google
    "picture": "https://...",        // Google profile picture
    "loginTime": "2026-03-14T10:30:00.000Z"
  },
  "zerobg_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "zerobg_token_expiry": "1710417000000",
  "bgRemovalHistory": [
    {
      "id": 1710417000000,
      "originalFileName": "image.jpg",
      "originalFileType": "image/jpeg",
      "processedImageUrl": "https://...",
      "originalPreview": "data:image/jpeg;base64,...",
      "timestamp": "2026-03-14T10:30:00.000Z"
    }
  ]
}
```

### Storage Capacity

- **Local Storage Limit:** ~5-10MB per domain
- **Token Expiry:** 1 hour (3600 seconds)
- **History:** Unlimited (until storage is full)

---

## 🔑 How to Access User Data

### 1. Add Your Google Client ID to .env.local

Create/Edit `.env.local` in your project root:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with the Client ID you copied from Google Cloud.

### 2. Access User Data in Your Components

```typescript
import { getUserData, getAuthToken, isAuthenticated } from '@/lib/auth';

// In any React component:
const user = getUserData();
const token = getAuthToken();
const loggedIn = isAuthenticated();

if (loggedIn) {
  console.log(user.name);      // "John Doe"
  console.log(user.email);     // "user@gmail.com"
  console.log(user.picture);   // "https://..."
}
```

### 3. Access from Browser Console

Open your browser's **Developer Tools** (F12) and go to **Console**:

```javascript
// Get user data
JSON.parse(localStorage.getItem('zerobg_user'));

// Get token
localStorage.getItem('zerobg_token');

// Get history
JSON.parse(localStorage.getItem('bgRemovalHistory'));

// Check if authenticated
localStorage.getItem('zerobg_user') !== null;
```

---

## 📁 File Structure

```
src/
├── lib/
│   └── auth.ts                 # Authentication utility functions
├── pages/
│   ├── Login.tsx              # Login page with Google OAuth
│   └── Register.tsx           # Signup page with Google OAuth
├── main.tsx                   # App entry point (with GoogleOAuthProvider)
└── .env.local                 # Environment variables (your Google Client ID)
```

---

## 📚 API Reference

### Auth Functions (in `src/lib/auth.ts`)

#### `storeUserData(userData: User, token: string)`
Stores user data and token in localStorage after successful login.

```typescript
storeUserData({
  id: "123",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://...",
  loginTime: new Date().toISOString(),
}, "jwt_token");
```

#### `getUserData(): User | null`
Retrieves stored user data from localStorage.

```typescript
const user = getUserData();
if (user) {
  console.log(user.email);
}
```

#### `getAuthToken(): string | null`
Gets the authentication token (returns null if expired).

```typescript
const token = getAuthToken();
if (token) {
  // Token is valid
}
```

#### `isAuthenticated(): boolean`
Check if user is currently logged in.

```typescript
if (isAuthenticated()) {
  // Show dashboard
} else {
  // Show login page
}
```

#### `clearAuthData()`
Remove all authentication data from localStorage.

```typescript
clearAuthData(); // Clears user, token, and expiry
```

#### `logout()`
Logout user and redirect to home page.

```typescript
logout(); // Clears data and redirects to "/"
```

#### `parseGoogleToken(token: string)`
Decode Google JWT token to extract user information.

```typescript
const decoded = parseGoogleToken(token);
console.log(decoded.email); // "user@gmail.com"
```

---

## 🔄 Data Flow Diagram

```
User Login/Signup
        ↓
Google OAuth Login
        ↓
Google Returns JWT Token
        ↓
Parse Token to Get User Info
        ↓
Store in LocalStorage:
  - zerobg_user (profile)
  - zerobg_token (JWT)
  - zerobg_token_expiry (1 hour)
        ↓
User Logged In ✅
        ↓
User Can:
  - Upload images
  - Remove backgrounds
  - View history (all stored locally)
  - Download processed images
```

---

## 🔗 Quick Setup Summary

```bash
# 1. Get Google Client ID from console.cloud.google.com

# 2. Add to .env.local
VITE_GOOGLE_CLIENT_ID=YOUR_ID_HERE

# 3. Install dependency
npm install @react-oauth/google

# 4. Run development server
npm run dev

# 5. Visit login/register page and try Google OAuth!
```

---

## 🚀 Deployment on Vercel

1. In Vercel Dashboard
2. Go to Settings → Environment Variables
3. Add: `VITE_GOOGLE_CLIENT_ID=YOUR_ID`
4. Add `https://clearcut-ai-kappa.vercel.app` to Google OAuth redirect URIs
5. Deploy!

---

## ❓ Troubleshooting

### "Google login button not showing"
- Check if `VITE_GOOGLE_CLIENT_ID` is in `.env.local`
- Restart dev server after adding env variable

### "Login fails silently"
- Check browser console (F12 → Console)
- Make sure redirect URI is added to Google Cloud Console

### "Data disappears after refresh"
- Data is stored in localStorage - check if localStorage is enabled
- Check in DevTools → Application → Local Storage

### "Token expired error"
- Tokens expire after 1 hour
- User needs to login again to get a new token

---

## 📞 Support

For issues or questions, check:
1. Browser console (F12 → Console tab) for errors
2. `.env.local` file has correct Client ID
3. Redirect URIs in Google Cloud Console match your domain
