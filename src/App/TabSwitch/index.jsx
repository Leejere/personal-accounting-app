import React from "react";
import Button from "../Components/Button";
import ButtonGroup from "../Components/ButtonGroup";

import PropTypes from "prop-types";

export default function TabSwitch({ tabs, onTabChange }) {
  return (
    <ButtonGroup
      onChange={(value) => onTabChange(value)}
      initValue={tabs[0].value}
    >
      {tabs.map((tab) => (
        <Button key={tab.value} value={tab.value}>
          {tab.displayName}
        </Button>
      ))}
    </ButtonGroup>
  );
}

TabSwitch.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of tab objects
  onTabChange: PropTypes.func, // Callback that takes selected tab as arg
};
