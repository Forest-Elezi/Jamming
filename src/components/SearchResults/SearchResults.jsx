import React from "react";
import Track from "../Track/Track.jsx";

const SearchResults = ({ results, addTrack }) => {
  return (
    <>
      {results.map((result) => (
        <Track
          key={result.id}
          track={result}
          addTrack={addTrack}
          isRemoval={false}
        />
      ))}
    </>
  );
};

export default SearchResults;
