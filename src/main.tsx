import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  console.error("❌ VITE_GOOGLE_CLIENT_ID is not set in .env.local");
  console.error("Please add: VITE_GOOGLE_CLIENT_ID=your_client_id to .env.local");
}

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId || "dummy-id"}>
    <App />
  </GoogleOAuthProvider>
);

