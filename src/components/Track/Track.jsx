import React from "react";
import styles from "./Track.module.css";

const Track = ({ track, handleAddTrack, isInPlaylist, handleRemoveTrack }) => {
  return (
    <div className={styles.trackRow} >
      <div className={styles.track} >
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {!isInPlaylist && (
        <button onClick={() => handleAddTrack(track)}>+</button>
      )}
      {isInPlaylist && (
        <button onClick={() => handleRemoveTrack(track)}>-</button>
      )}
    </div>
  );
};

export default Track;
