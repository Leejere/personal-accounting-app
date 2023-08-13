import React, { useContext } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { ButtonGroupContext } from "..//ButtonGroup";

export default function Button({ children, onClick, index, total }) {
  const context = useContext(ButtonGroupContext);

  let buttonStyle = styles.button;
  if (context.inGroup) {
    buttonStyle =
      index === 0
        ? `${buttonStyle} ${styles.firstButton}`
        : index === total - 1
        ? `${buttonStyle} ${styles.lastButton}`
        : `${buttonStyle} ${styles.middleButton}`;
  }
  return (
    <button className={buttonStyle} onClick={onClick}>
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
