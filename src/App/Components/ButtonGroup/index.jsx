import React, { createContext } from "react";
import styles from "./index.module.css";

// Create a context, telling whatever button in it that "You are in a group!"
export const ButtonGroupContext = createContext({ inGroup: false });

export default function ButtonGroup({ children }) {
  // Tell whatever button in it: You are 1st/2nd/etc. out of X buttons!
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        index,
        total: React.Children.count(children),
      });
    }
    return child;
  });
  return (
    <ButtonGroupContext.Provider value={{ inGroup: true }}>
      <div className={styles.buttonGroup}>{childrenWithProps}</div>
    </ButtonGroupContext.Provider>
  );
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
