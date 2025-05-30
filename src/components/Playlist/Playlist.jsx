//Add a 'Save To Spotify' button
import React from "react";
import TrackList from "../TrackList/TrackList.jsx";

const Playlist = ({ name, tracklists }) => {
  return (
    <>
     <h2>{name}</h2>
     <TrackList tracklists={tracklists} />
    </>
  )
};

export default Playlist;
