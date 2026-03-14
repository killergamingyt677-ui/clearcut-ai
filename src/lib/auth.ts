/**
 * Auth Utility for Google OAuth
 * Stores user data in localStorage
 */

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  loginTime: string;
}

const AUTH_KEY = "zerobg_user";
const TOKEN_KEY = "zerobg_token";
const EXPIRY_KEY = "zerobg_token_expiry";

/**
 * Store user data in localStorage after successful Google login
 */
export const storeUserData = (userData: User, token: string) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, token);
    // Token expires in 1 hour (3600 seconds)
    const expiryTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error("Failed to store user data:", error);
  }
};

/**
 * Retrieve user data from localStorage
 */
export const getUserData = (): User | null => {
  try {
    const userData = localStorage.getItem(AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
    return null;
  }
};

/**
 * Get stored authentication token
 */
export const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);

    if (!token || !expiry) return null;

    // Check if token has expired
    if (new Date().getTime() > parseInt(expiry)) {
      clearAuthData();
      return null;
    }

    return token;
  } catch (error) {
    console.error("Failed to retrieve auth token:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null && getUserData() !== null;
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  } catch (error) {
    console.error("Failed to clear auth data:", error);
  }
};

/**
 * Logout user and clear all data
 */
export const logout = () => {
  clearAuthData();
  window.location.href = "/";
};

/**
 * Parse Google JWT token (without verifying signature - client-side only)
 */
export const parseGoogleToken = (token: string) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid token");

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
};
