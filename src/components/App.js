import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./Searchbar/Searchbar";
import ImageGalleryContainer from "./ImageGalleryContainer/ImageGalleryContainer";

import Loader from "./Loader/Loader";
// import Button from "./Button/Button";
// import Modal from "./Modal/Modal";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Phonebook.module.css";

class ImageFinder extends React.Component {
  state = {
    searchImage: "",
    fetchedImages: [],
    loading: false,
  };

  handleFormSubmit = (searchImageName) => {
    this.setState({
      searchImage: searchImageName,
    });
  };

  render() {
    const { searchImage, fetchedImages, loading } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={2000} position="top-center" />
        {loading && <Loader />}
        {fetchedImages && (
          <ImageGalleryContainer searchImageName={searchImage} />
        )}
      </div>
    );
  }
}

ImageFinder.propTypes = {
  searchImage: PropTypes.string,
  fetchedImages: PropTypes.array,
  loading: PropTypes.bool,
};

export default ImageFinder;
