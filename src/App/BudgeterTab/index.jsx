import React from "react";

import PropTypes from "prop-types";

export default function BudgeterTab({ show }) {
  return (
    <section style={{ display: show ? "flex" : "none" }}>Budgeter</section>
  );
}

BudgeterTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
