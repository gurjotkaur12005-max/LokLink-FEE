// Helpers for browser storage and for reading the JSON "mock database".
// localStorage is NOT a real database: data stays only in this browser.
import localities from "../data/localities.json";
import schemes from "../data/schemes.json";
import complaintsData from "../data/complaints.json";

// Keys used in localStorage
export const KEYS = {
  saved: "loklink_saved_schemes",
  complaints: "loklink_my_complaints",
  user: "loklink_demo_user",
  profiles: "loklink_demo_profiles",
  bookmarks: "loklink_bookmarks",
};

// Shared constants used by several pages
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const STATUS_STEPS = ["Submitted", "Under Review", "In Progress", "Resolved"];
export const SERVICE_CATEGORIES = [
  { name: "Water Supply", icon: "💧", tone: "blue" },
  { name: "Roads", icon: "🛣️", tone: "orange" },
  { name: "Electricity", icon: "⚡", tone: "orange" },
  { name: "Sanitation", icon: "🧹", tone: "green" },
  { name: "Street Lights", icon: "💡", tone: "blue" },
  { name: "Public Safety", icon: "🛡️", tone: "green" },
  { name: "Parks & Public Spaces", icon: "🌳", tone: "green" },
  { name: "Healthcare", icon: "🏥", tone: "blue" },
];
export const COMPLAINT_CATEGORIES = SERVICE_CATEGORIES.map((c) => c.name);

// ---------- Basic localStorage helpers (wrapped in try/catch) ----------
export function readJSON(key, fallback) {
  try {
    const text = localStorage.getItem(key);
    if (text === null) {
      return fallback;
    }
    return JSON.parse(text);
  } catch (error) {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Storage may be full or blocked. The app still works for this session.
  }
}

// ---------- Complaints: JSON file + complaints saved by the user ----------
export function getMyComplaints() {
  return readJSON(KEYS.complaints, []);
}

export function getAllComplaints() {
  return [...getMyComplaints(), ...complaintsData];
}

export function addComplaint(complaint) {
  const mine = getMyComplaints();
  writeJSON(KEYS.complaints, [complaint, ...mine]);
}

export function generateComplaintId() {
  const existing = getAllComplaints().map((c) => c.id);
  let id = "";
  // Keep generating until we get an ID that is not already used
  do {
    const number = Math.floor(1000 + Math.random() * 9000);
    id = "LL-2026-" + number;
  } while (existing.includes(id));
  return id;
}

// ---------- Demo profiles (name, email, locality only. NO passwords) ----------
export function getProfile(email) {
  const profiles = readJSON(KEYS.profiles, {});
  return profiles[email.toLowerCase()] || null;
}

export function saveProfile(profile) {
  const profiles = readJSON(KEYS.profiles, {});
  profiles[profile.email.toLowerCase()] = profile;
  writeJSON(KEYS.profiles, profiles);
}

export function makeNameFromEmail(email) {
  const first = email.split("@")[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

// ---------- Lookups in the JSON data ----------
export function getLocalityById(id) {
  return localities.find((l) => l.id === id);
}

export function getLocalityName(id) {
  const locality = getLocalityById(id);
  return locality ? locality.name : "Unknown locality";
}

export function getSchemeById(id) {
  return schemes.find((s) => s.id === id);
}

// Search localities by name, district, state or PIN code
export function searchLocalities(text) {
  const query = text.trim().toLowerCase();
  if (query === "") {
    return localities;
  }
  return localities.filter((l) => {
    return (
      l.name.toLowerCase().includes(query) ||
      l.district.toLowerCase().includes(query) ||
      l.state.toLowerCase().includes(query) ||
      l.pin.includes(query)
    );
  });
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
