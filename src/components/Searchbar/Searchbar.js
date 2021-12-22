import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

const Searchbar = ({ onFormSubmit }) => {
  const [searchImageName, setSearchImageName] = useState('');

  const handleNameChange = event => {
    setSearchImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImageName.trim() === '') {
      toast.error('please, enter images name');
      return;
    }
    onFormSubmit(searchImageName);
    setSearchImageName('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <ImSearch />
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          name="searchImageName"
          autoComplete="off"
          autoFocus
          value={searchImageName}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchImageName: PropTypes.string,
};

export default Searchbar;
