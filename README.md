# Jamming - Spotify Playlist Manager

## Overview

Jamming is a React-based web application that allows users to search Spotify's vast music library, build custom playlists by adding or removing tracks and save these playlists to their Spotify accounts. The app focuses on a clean user experience by preventing duplicate tracks, enabling easy playlist management and supporting keyboard controls

## Technologies

- React with Hooks for UI and state management
- CSS Modules for scoped, maintainable styling
- Spotify Web API for music search, authentication and playlist management
- OAuth for secure user authentication

## Features

- **Track Search**: Enter a song title to search Spotify's catalog.
- **Duplicate Prevention**: Search results and playlists automatically exclude duplicate tracks.
- **Playlist Management**: Add or remove tracks with simple controls.
- **Save to Spotify**: Save your custom playlists to your Spotify account.
- **Input Reset**: Search input clears after each search for smooth UX.
- **Disabled Save Button**: Prevents saving empty playlists by disabling the button when no tracks exist.
- **Keyboard Accessibility**: Press Enter to search without clicking the button.
- **Authentication**: Spotify OAuth flow to securely connect user accounts.

## Getting Started

1. **Clone the repository**:
     `git clone <your-repo-url>`
2. **Navigate into the project directory**:
     `cd jamming`
3. **Install dependencies**:
     `npm install`
4. **Set Up Spotify API credentials**:
     - Create a Spotify Developer account
     - Register your app to get client ID and secret
     - Configure redirect URI to use either:
        - An HTTPS URL like `https://yourdomain.com/callback` **OR**
        - A loopback IP address with explicit port, e.g, `http://127.0.0.1:8000/callback` or `http://[::1]:8000/callback`
     - **Note**: Do NOT use `localhost` as a redirect URI
     - Store credentials and redirect URI as required by your app
5. **Start the development server on the specified port (e.g. 8000)**:
     `npm start`
    (Make sure this port matches the one in your redirect URI)
6. **Open your browser and visit**:
     `http://127.0.0.1:8000` (or your configured loopback IP and port)
7. **Log in with Spotify when prompted to use the app**.