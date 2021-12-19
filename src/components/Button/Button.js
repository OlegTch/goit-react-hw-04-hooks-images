import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ handleButton }) => {
  return (
    <button className={styles.button} type="button" onClick={handleButton}>
      Load more...
    </button>
  );
};

Button.propTypes = { handleButton: PropTypes.func.isRequired };

export default Button;
