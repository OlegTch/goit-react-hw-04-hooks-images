import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, image, tags, onImageClick }) => {
  return (
    <li className={styles.imageGalleryItem} onClick={onImageClick}>
      <img
        className={styles.imageGalleryItemImage}
        id={id}
        src={image}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
