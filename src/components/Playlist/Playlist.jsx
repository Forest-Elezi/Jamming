import React from "react";
import TrackList from "../TrackList/TrackList.jsx";
import styles from "./Playlist.module.css";

const Playlist = ({
  playlistName,
  setPlaylistName,
  playlistTracks,
  handleRemoveTrack,
  handleSaveToSpotify,
}) => {
  const handlePlaylist = ({ target }) => {
    setPlaylistName(target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="name">
        <input
          className={styles.name}
          id="name"
          type="text"
          value={playlistName}
          onChange={handlePlaylist}
        />
      </label>
      <TrackList
        playlistTracks={playlistTracks}
        isInPlaylist={true}
        handleRemoveTrack={handleRemoveTrack}
      />
      <button
        onClick={handleSaveToSpotify}
        className={styles.button}
        disabled={playlistTracks.length === 0}
      >
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
