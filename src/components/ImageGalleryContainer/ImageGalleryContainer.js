import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

import { toast } from 'react-toastify';

import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import imagesAPI from '../../services/image-api';

import img from '../../images/find.jpg';
import styles from '../ImageGallery/ImageGallery.module.css';

const ImageGalleryContainer = ({ searchImageName }) => {
  // const [searchImage, setSearchImage] = useState('');
  const [fetchedImages, setFetchedImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalImages, setTotalImages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const [pageSize] = useState(12);
  const prevImage = useRef(null);
  const prevPage = useRef(0);

  // ==================================================
  useEffect(() => {
    if (!searchImageName) {
      return;
    }

    if (prevImage.current !== searchImageName) {
      prevPage.current = 0;
      // setPageNumber(1);
    }
    const newPageNumber =
      prevImage.current !== searchImageName ? 1 : pageNumber;

    if (
      prevImage.current !== searchImageName ||
      prevPage.current < newPageNumber
    ) {
      setStatus('pending');

      imagesAPI
        .fetchImages(searchImageName, newPageNumber, pageSize)
        .then(data => {
          if (data.hits.length === 0) {
            return toast.error(
              `Invalid request name ${searchImageName}. Please try again`,
            );
          }

          if (prevImage.current === searchImageName) {
            setFetchedImages(fetchedImages => [...fetchedImages, ...data.hits]);
          } else {
            setFetchedImages(data.hits);
            setTotalImages(data.total);
          }

          if (prevImage.current !== searchImageName) {
            setPageNumber(1);
          }
          prevImage.current = searchImageName;
          prevPage.current = newPageNumber;

          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [pageNumber, searchImageName, pageSize]);

  // ==================================================
  const handleLodeMoreButton = event => {
    setPageNumber(pageNumber => pageNumber + 1);
    setStatus('pending');
  };

  const openModal = event => {
    event.preventDefault();
    setShowModal(true);
    const largeImage = fetchedImages.find(
      image => event.target.src === image.webformatURL,
    );
    setModalImage(largeImage);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // ==================================================
  if (status === 'idle') {
    return <img className={styles.img} src={img} alt="search images"></img>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <p className="errorText">{error.message}</p>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery fetchedImages={fetchedImages} onOpenModal={openModal} />
        {fetchedImages.length < totalImages && (
          <Button handleButton={handleLodeMoreButton} />
        )}

        {showModal && <Modal onClose={closeModal} image={modalImage}></Modal>}
      </>
    );
  }
};

ImageGalleryContainer.propTypes = {
  searchImage: PropTypes.string,
  fetchedImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
  totalImages: PropTypes.number,
  pageNumber: PropTypes.number,
  status: PropTypes.string,
  error: PropTypes.bool,
  showModal: PropTypes.bool,
  modalImage: PropTypes.string,

  pageSize: PropTypes.number,
  prevImage: PropTypes.string,
  prevPage: PropTypes.number,
};

export default ImageGalleryContainer;
