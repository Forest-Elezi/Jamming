import React, { useState } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";

function App() {
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
    },
    {
      id: 5,
      name: "Vampire",
      artist: "Olivia Rodrigo",
      album: "Guts",
    },
  ]);

  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Anti-Hero", artist: "Taylor Swift", album: "Midnights" },
    {
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
    },
    {
      id: 3,
      name: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
    },
    { id: 4, name: "Hotline Bling", artist: "Drake", album: "Views" },
    { id: 5, name: "Vampire", artist: "Olivia Rodrigo", album: "Guts" },
  ]);

  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks((prev) => [...prev, track]);
    }
  };

  return (
    <>
      <div>
        <h2>Results</h2>
        <SearchResults results={searchResults} addTrack={addTrack} />
      </div>
      <Playlist name={playlistName} tracklists={playlistTracks} />
    </>
  );
}

export default App;
