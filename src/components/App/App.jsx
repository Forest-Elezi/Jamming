import React, { useState } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import Spotify from "../../utils/Spotify.js";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      uri: "spotify:track: 1",
    },
    {
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      uri: "spotify:track: 2",
    },
    {
      id: 3,
      name: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      uri: "spotify:track: 3",
    },
  ]);

  const handleAddTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks((prev) => [...prev, track]);
      setSearchResults((prev) => prev.filter((t) => t.id !== track.id));
    }
  };

  const handleRemoveTrack = (track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  const handlePlaylistName = async () => {
    const data = await Spotify.createPlaylist(playlistName);
    setPlaylistName(data);
  };

  return (
    <>
      <div>
        <h2>Results</h2>
        <SearchResults
          searchResults={searchResults}
          handleAddTrack={handleAddTrack}
        />
      </div>
      <Playlist
        playlistName={playlistName}
        onCreatePlaylist={handlePlaylistName}
        playlistTracks={playlistTracks}
        setPlaylistTracks={setPlaylistTracks}
        handleRemoveTrack={handleRemoveTrack}
      />
    </>
  );
}

export default App;
