const USERS = {
  admin: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
  teacher: "97e1899199e3ba34b7d51c8c64c6da7261af0990013b90f576400c30299bdb97"
};

const sessions = new Map();

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken() {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login(username, password) {
  if (!username || !password) {
    return { ok: false, error: "Username and password are required." };
  }
  const stored = USERS[username];
  if (!stored || stored !== (await sha256(password))) {
    return { ok: false, error: "Invalid username or password." };
  }
  const token = randomToken();
  sessions.set(token, { username, createdAt: Date.now() });
  return { ok: true, token, username };
}

function isAuthenticated(token) {
  return Boolean(token && sessions.has(token));
}

function logout(token) {
  return sessions.delete(token);
}

export { login, isAuthenticated, logout, sha256 };
