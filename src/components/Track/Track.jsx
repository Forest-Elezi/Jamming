import React from "react";

const Track = ({ track, handleAddTrack, isInPlaylist, handleRemoveTrack }) => {
  return (
    <>
      <div>
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
    </>
  );
};

export default Track;
