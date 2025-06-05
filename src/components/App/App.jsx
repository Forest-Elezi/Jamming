import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import Spotify from "../../utils/Spotify.js";
import Auth from "../../utils/Auth.jsx";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (token) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated && !window.location.search.includes("code")) {
    return <Auth onAuth={() => setIsAuthenticated(true)} />;
  }

  const handleSearch = async () => {
    const data = await Spotify.searchTracks(searchTerm);
    setSearchResults(data);
  };

  const handleSaveToSpotify = async () => {
    await Spotify.addToPlaylist(playlistName, searchTerm);
    setPlaylistTracks([]);
  };

  const handleAddTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks((prev) => [...prev, track]);
      setSearchResults((prev) => prev.filter((t) => t.id !== track.id));
    }
  };

  const handleRemoveTrack = (track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  return (
    <div className={styles.app} >
      <h1>Jamming</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <div className={styles.wrapper} >
        <div className={styles.card}>
          <SearchResults
            searchResults={searchResults}
            handleAddTrack={handleAddTrack}
          />
        </div>
        <div className={styles.card} >
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistTracks={playlistTracks}
            handleRemoveTrack={handleRemoveTrack}
            handleSaveToSpotify={handleSaveToSpotify}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
