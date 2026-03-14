# 🔐 Google Authentication - Quick Setup

## ⚡ QUICK STEPS

### Step 1: Get Google Client ID
1. Go to: https://console.cloud.google.com/
2. Create project → Enable Google+ API → Create OAuth credentials
3. Add redirect URIs:
   - `http://localhost:5173`
   - `https://clearcut-ai-kappa.vercel.app`
4. Copy your **Client ID**

### Step 2: Add to Project
Create `.env.local` in project root:
```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

### Step 3: Done! 
Login/Register buttons now work with Google OAuth!

---

## 💾 WHERE DATA IS STORED

All data is stored in **Browser's LocalStorage**:

| Key | Content | Expires |
|-----|---------|---------|
| `zerobg_user` | User profile (name, email, picture) | Never |
| `zerobg_token` | Google JWT token | 1 hour |
| `zerobg_token_expiry` | Token expiration time | 1 hour |
| `bgRemovalHistory` | All processed images | Never |

### Check in Browser:
Press `F12` → Console → type:
```javascript
JSON.parse(localStorage.getItem('zerobg_user'))
```

---

## 🔑 ACCESS USER DATA IN CODE

```typescript
import { getUserData, isAuthenticated } from '@/lib/auth';

// Get logged-in user
const user = getUserData();
console.log(user?.name);    // "John Doe"
console.log(user?.email);   // "john@gmail.com"

// Check if logged in
if (isAuthenticated()) {
  // Show dashboard
}
```

---

## 📊 USER OBJECT STRUCTURE

```javascript
{
  id: "1234567890",                    // Google ID
  email: "user@gmail.com",             // Email
  name: "John Doe",                    // Full name
  picture: "https://lh3.googleusercontent.com/...",
  loginTime: "2026-03-14T10:30:00.000Z"
}
```

---

## 🔄 WHAT HAPPENS ON LOGIN/SIGNUP?

1. **User clicks Google button**
2. **Google OAuth popup appears**
3. **User authorizes**
4. **JWT token received from Google**
5. **Token decoded to get user info**
6. **Data stored in localStorage**
7. **Redirected to `/dashboard`**
8. **User stays logged in even after refresh** ✅

---

## 🧪 TEST LOCALLY

```bash
# Start dev server
npm run dev

# Visit login/register page
http://localhost:5173/login

# Try Google OAuth!
```

---

## 🚀 DEPLOY TO VERCEL

1. Add env variable in Vercel dashboard:
   - `VITE_GOOGLE_CLIENT_ID=YOUR_ID`

2. Add redirect URI in Google Cloud:
   - `https://clearcut-ai-kappa.vercel.app`

3. Deploy!

---

## 📝 FILES CREATED/MODIFIED

- ✅ `src/lib/auth.ts` - Authentication utilities
- ✅ `src/main.tsx` - Added GoogleOAuthProvider
- ✅ `src/pages/Login.tsx` - Added Google OAuth
- ✅ `src/pages/Register.tsx` - Added Google OAuth
- ✅ `.env.local` - Store your Client ID here
- ✅ `AUTHENTICATION_GUIDE.md` - Full documentation

---

## ❌ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Google button not showing | Restart dev server after adding `.env.local` |
| Login fails | Check Client ID in `.env.local` |
| Data lost on refresh | Check if localStorage is enabled in browser |
| Token expired | User needs to login again (expires after 1 hour) |

---

## ✅ NOW YOUR APP HAS:

- ✅ Google OAuth Login/Signup
- ✅ Automatic data storage in LocalStorage
- ✅ User data persists after refresh
- ✅ Background removal history saved
- ✅ Email/password demo login (for testing)

**Ready to go! 🚀**
