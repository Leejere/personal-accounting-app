import React, { useState, useEffect, createContext } from "react";
import styles from "./index.module.css";

import PropTypes from "prop-types";

// Create a context, telling whatever button in it that "You are in a group!"
export const ButtonGroupContext = createContext({ inGroup: false });

export default function ButtonGroup({ children, onChange, initValue }) {
  const [selected, setSelected] = useState(initValue);

  // Listen for value change
  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);

  // Tell whatever button in it: You are 1st/2nd/etc. out of X buttons!
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        index,
        total: React.Children.count(children),
        onClick: () => setSelected(child.props.value),
      });
    }
    return child;
  });
  return (
    <ButtonGroupContext.Provider value={{ inGroup: true, selected: selected }}>
      <div className={styles.buttonGroup}>{childrenWithProps}</div>
    </ButtonGroupContext.Provider>
  );
}

ButtonGroup.propTypes = {
  initValue: PropTypes.any, // Initial value; has to be one of the children's values
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func, // Callback that takes selected value as arg
};
