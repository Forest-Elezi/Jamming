import React from "react";
import Track from "../Track/Track";

const TrackList = ({ tracklists }) => {
  return (
    <>
      {tracklists.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </>
  );
};

export default TrackList;
