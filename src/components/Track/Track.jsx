import React from "react";

const Track = ({ track, addTrack, isRemoval }) => {
  return (
    <>
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {!isRemoval && <button onClick={() => addTrack(track)}>+</button>}
    </>
  );
};

export default Track;
