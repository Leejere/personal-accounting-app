import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

export default function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};
