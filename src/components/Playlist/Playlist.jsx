import React from "react";
import TrackList from "../TrackList/TrackList.jsx";

const Playlist = ({
  playlistName,
  setPlaylistName,
  playlistTracks,
  setPlaylistTracks,
  handleRemoveTrack,
}) => {
  const handlePlaylist = ({ target }) => {
    setPlaylistName(target.value);
  };

  const handleSavePlaylist = (tracks) => {
    const URIarray = tracks.map((track) => track.uri);
    console.log(URIarray);
    setPlaylistTracks([]);
  };

  return (
    <>
      <div>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            value={playlistName}
            onChange={handlePlaylist}
          />
        </label>
      </div>
      <div>
        <TrackList
          playlistTracks={playlistTracks}
          isInPlaylist={true}
          handleRemoveTrack={handleRemoveTrack}
        />
      </div>
      <button onClick={() => handleSavePlaylist(playlistTracks)}>
        SAVE TO SPOTIFY
      </button>
    </>
  );
};

/* To obtain a Spotify uri, 
simply right-click (on Windows) or 
ctrl-click (on Mac) on a song’s name. */

export default Playlist;
