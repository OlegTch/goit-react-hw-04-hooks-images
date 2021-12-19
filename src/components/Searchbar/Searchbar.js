import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = { searchImageName: "" };

  handleNameChange = (event) => {
    this.setState({ searchImageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchImageName.trim() === "") {
      toast.error("please, enter images name");
      return;
    }
    this.props.onFormSubmit(this.state.searchImageName);
    this.setState({ searchImageName: "" });
  };

  render() {
    const { searchImageName } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  searchImageName: PropTypes.string,
};

export default Searchbar;
