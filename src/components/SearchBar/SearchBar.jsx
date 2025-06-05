import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleSearchTerm = ({ target }) => {
    setSearchTerm(target.value);
  };

  return (
    <div className={styles.searchBarContainer} >
      <div>
        <label htmlFor="search">
          <input
            className={styles.searchInput}
            id="search"
            type="text"
            placeholder="Enter A Song Title"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
        </label>
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
