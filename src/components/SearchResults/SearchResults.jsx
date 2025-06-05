import React from "react";
import Track from "../Track/Track.jsx";
import styles from "./SearchResults.module.css";

const SearchResults = ({ searchResults, handleAddTrack }) => {
  return (
    <div className={styles["search-results"]}>
      <h2>Results</h2>
      <div className={styles.trackListContainer} >
        {searchResults.map((result) => (
          <Track
            key={result.id}
            track={result}
            handleAddTrack={handleAddTrack}
            isInPlaylist={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
