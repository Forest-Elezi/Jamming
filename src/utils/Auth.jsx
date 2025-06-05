import React, { useEffect } from "react";
import clientId from "../config";

const redirectUri = "http://127.0.0.1:5173/callback";
const scope =
  "user-read-private user-read-email playlist-modify-public playlist-modify-private";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = window.crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

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

const Auth = () => {
  useEffect(() => {
    const doAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");

      if (!code) {
        const codeVerifier = generateRandomString(64);
        window.localStorage.setItem("code_verifier", codeVerifier);

        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        const state = generateRandomString(16);
        window.localStorage.setItem("state", state);

        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.search = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          scope,
          code_challenge_method: "S256",
          code_challenge: codeChallenge,
          redirect_uri: redirectUri,
          state: state,
        }).toString();
        window.location.href = authUrl.toString();
      } else {
        const returnedState = urlParams.get("state");
        const storedState = window.localStorage.getItem("state");
        console.log("Returned:", returnedState);
        console.log("Stored", storedState);
        if (!returnedState || returnedState !== storedState) {
          console.error("State mismatch or missing");
          return;
        }
        window.localStorage.removeItem("state");

        const codeVerifier = window.localStorage.getItem("code_verifier");

        const response = await fetch("https://accounts.spotify.com/api/token", {
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
        });

        const data = await response.json();

        if (data.access_token) {
          window.localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            window.localStorage.setItem("refresh_token", data.refresh_token);
          }
          window.history.replaceState({}, document.title, "/");
          console.log("Access Token:", data.access_token);
        } else {
          console.error("Failed to get token", data);
        }
      }
    };

    doAuth();
  }, []);

  return <div>Logging in...</div>;
};

export default Auth;
