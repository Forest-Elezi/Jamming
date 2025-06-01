import React, { useState } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";

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
    {
      id: 4,
      name: "Hotline Bling",
      artist: "Drake",
      album: "Views",
      uri: "spotify:track: 4",
    },
    {
      id: 5,
      name: "Vampire",
      artist: "Olivia Rodrigo",
      album: "Guts",
      uri: "spotify:track: 5",
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
        setPlaylistName={setPlaylistName}
        playlistTracks={playlistTracks}
        setPlaylistTracks={setPlaylistTracks}
        handleRemoveTrack={handleRemoveTrack}
      />
    </>
  );
}

export default App;
