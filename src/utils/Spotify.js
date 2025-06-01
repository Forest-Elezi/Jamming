// Code Verifier -->
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64);

// Code Challenge -->
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);

// Request User Authorization -->
const clientId = "cbfe4b9664634aef930c89cf8a5268b2";
const redirectUri = "http://127.0.0.1:5173/callback";

const scope =
  "user-read-private user-read-email playlist-modify-public playlist-modify-private";

const authUrl = new URL("https://accounts.spotify.com/authorize");

// generated in the previous step
window.localStorage.setItem("code_verifier", codeVerifier);

const state = generateRandomString(16);
window.localStorage.setItem("state", state);

const params = {
  response_type: "code",
  client_id: clientId,
  scope,
  code_challenge_method: "S256",
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
  state: state,
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

// Response -->

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get("code");

// Request an Access Token -->

const getToken = async (code) => {
  // stored in the previous step
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
};

// Refreshing Token -->

const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
  if (response.refresh_token) {
    localStorage.setItem("refresh_token", response.refresh_token);
  }
};

// Extract Accecc Token and Expiration time from URL

const hashParams = new URLSearchParams(window.location.hash.substring(1));
const accessToken = hashParams.get("access_token");
const expiresIn = hashParams.get("expires_in");

// Store token, expire it, alert user, clean URL

if (accessToken) {
  localStorage.setItem("access_token", accessToken);
  setTimeout(() => localStorage.removeItem("access_token"), expiresIn * 1000);
} else {
  alert("Please log in to Spotify to continue.");
}

window.history.replaceState({}, document.title, "/");
