import React from "react";
import Track from "../Track/Track";
import styles from "./TrackList.module.css";

const TrackList = ({ playlistTracks, isInPlaylist, handleRemoveTrack }) => {
  return (
    <div className={styles["track-list"]} >
      {playlistTracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          isInPlaylist={isInPlaylist}
          handleRemoveTrack={handleRemoveTrack}
        />
      ))}
    </div>
  );
};

export default TrackList;
