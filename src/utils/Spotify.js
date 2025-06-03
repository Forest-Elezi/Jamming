// Code Verifier -->
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = window.crypto.getRandomValues(new Uint8Array(length));
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

const Spotify = {
  async getToken(code) {
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
  },

  // Refreshing Token -->

  async getRefreshToken() {
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
  },

  // Search Request -->

  async searchTracks(query) {
    const accessToken = localStorage.getItem("access_token");
    const url = new URL("https://api.spotify.com/v1/search");
    url.search = new URLSearchParams({
      q: query,
      type: "track",
      limit: 10,
    });

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data.tracks.items.map((item) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      uri: item.uri,
    }));
  },

  // Get UserID Fetch Request -->

  async getUserID() {
    const accessToken = localStorage.getItem("access_token");
    const url = "https://api.spotify.com/v1/me";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data.id;
  },

  // Create a Playlist request -->

  async createPlaylist(playlistName) {
    const accessToken = localStorage.getItem("access_token");
    const userID = await this.getUserID();
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

    const payload = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
        public: false,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    return data;
  },

  async addToPlaylist(playlistName, query) {
    const accessToken = localStorage.getItem("access_token");
    const userID = await this.getUserID();
    const { id: playlistID } = await this.createPlaylist(playlistName);
    const tracks = await this.searchTracks(query);
    if (!tracks.length) {
      throw new Error("No tracks found for the query.");
    }
    const tracksUri = tracks.map((track) => track.uri);
    const url = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;

    const payload = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracksUri,
        position: 0,
      }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    return data;
  },
};

if (code) {
  Spotify.getToken(code);
}

// Extract Access Token and Expiration time from URL -->

const hashParams = new URLSearchParams(window.location.hash.substring(1));
const accessToken = hashParams.get("access_token");
const expiresIn = hashParams.get("expires_in");

// Store token, expire time, alert user, clean URL

if (accessToken) {
  localStorage.setItem("access_token", accessToken);
  setTimeout(() => localStorage.removeItem("access_token"), expiresIn * 1000);
  window.history.replaceState({}, document.title, "/");
} else {
  alert("Please log in to Spotify to continue.");
}

export default Spotify;
