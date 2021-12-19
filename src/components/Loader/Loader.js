import React from "react";
// import PropTypes from "prop-types";
import BaseLoader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Loader.module.css";

export default class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loader}>
        <BaseLoader
          type="Watch"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}
