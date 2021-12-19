import PropTypes from "prop-types";
import { Component } from "react";

import { toast } from "react-toastify";

import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `23915751-8a3ca73cec67b4d724eaf6158`;
// let pageNumber = 1;
const pageSize = 12;

class ImageGalleryContainer extends Component {
  state = {
    searchImage: "",
    fetchedImages: null,
    // loading: false,
    error: null,
    status: "idle",
    totalImages: 0,
    pageNumber: 1,

    showModal: false,
    modalImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.searchImageName;
    const nextImage = this.props.searchImageName;

    if (prevImage !== nextImage) {
      this.resetPage();
    }

    const pageNumber = prevImage !== nextImage ? 1 : this.state.pageNumber;

    if (prevImage !== nextImage || prevState.pageNumber < pageNumber) {
      this.setState({ status: "pending" });

      fetch(
        `${BASE_URL}?q=${nextImage}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            console.log("response", response.ok);
            return response.json();
          }
          return Promise.reject(new Error(`Something wrong. Please try again`));
        })
        .then((data) => {
          if (data.hits.length === 0) {
            return toast.error(
              `Invalid request name ${nextImage}. Please try again`
            );
          }
          prevImage === nextImage
            ? this.setState(({ fetchedImages }) => ({
                fetchedImages: [...fetchedImages, ...data.hits],
                status: "resolved",
              }))
            : this.setState(() => ({
                fetchedImages: data.hits,
                status: "resolved",
                totalImages: data.total,
              }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleLodeMoreButton = (event) => {
    this.setState({ status: "pending" });
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  resetPage = () => {
    this.setState({ pageNumber: 1 });
  };

  openModal = (event) => {
    const { fetchedImages } = this.state;
    event.preventDefault();
    this.setState({ showModal: true });
    const largeImage = fetchedImages.find(
      (image) => event.target.src === image.webformatURL
    );

    this.setState({ modalImage: largeImage });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { fetchedImages, error, status, modalImage, showModal, totalImages } =
      this.state;

    if (status === "idle") {
      return (
        <img
          src="https://pixabay.com/get/gf3615c19298c92d3b82e8740d84c535f9288cc1f4e2dbd059d6cc1aa67149b49b9bf31ae912e5f5b396e269e70768b7a46d43a5a936c45d5082e8e505d8474ef_1280.jpg"
          alt="search images"
        />
      );
    }

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "rejected") {
      return <p className="errorText">{error.message}</p>;
    }

    if (status === "resolved") {
      return (
        <>
          <ImageGallery
            fetchedImages={fetchedImages}
            onOpenModal={this.openModal}
          />
          {fetchedImages.length < totalImages && (
            <Button handleButton={this.handleLodeMoreButton} />
          )}

          {showModal && (
            <Modal onClose={this.closeModal} image={modalImage}></Modal>
          )}
        </>
      );
    }
  }
}

ImageGalleryContainer.propTypes = {
  searchImage: PropTypes.string,
  fetchedImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  totalImages: PropTypes.number,
  pageNumber: PropTypes.number,
  status: PropTypes.string,
  error: PropTypes.bool,
  showModal: PropTypes.bool,
  modalImage: PropTypes.string,
};

export default ImageGalleryContainer;
