import React from "react";
import Track from "../Track/Track.jsx";

const SearchResults = ({ searchResults, handleAddTrack }) => {
  return (
    <>
      {searchResults.map((result) => (
        <Track
          key={result.id}
          track={result}
          handleAddTrack={handleAddTrack}
          isInPlaylist={false}
        />
      ))}
    </>
  );
};

export default SearchResults;
