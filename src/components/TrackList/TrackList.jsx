import React from "react";
import Track from "../Track/Track";

const TrackList = ({ playlistTracks, isInPlaylist, handleRemoveTrack }) => {
  return (
    <>
      {playlistTracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          isInPlaylist={isInPlaylist}
          handleRemoveTrack={handleRemoveTrack}
        />
      ))}
    </>
  );
};

export default TrackList;
