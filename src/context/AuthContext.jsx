import { createContext, useContext, useState } from "react";
import { readJSON, writeJSON, saveProfile, KEYS } from "../services/storage";

// AuthContext shares the DEMO login session with every component.
// It is not real security. Passwords are never stored.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readJSON(KEYS.user, null));

  function login(userInfo) {
    setUser(userInfo);
    writeJSON(KEYS.user, userInfo);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(KEYS.user);
  }

  // Used by the profile page to change the preferred locality
  function updateUser(changes) {
    const updated = { ...user, ...changes };
    setUser(updated);
    writeJSON(KEYS.user, updated);
    saveProfile(updated);
  }

  const value = { user, isLoggedIn: user !== null, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small helper so components can write useAuth() instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}
