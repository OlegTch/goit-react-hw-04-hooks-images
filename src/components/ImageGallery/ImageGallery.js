import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ fetchedImages, onOpenModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {fetchedImages.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          image={webformatURL}
          tags={tags}
          onImageClick={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  fetchedImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
