import React from "react";

import PropTypes from "prop-types";

export default function CashflowerTab({ show }) {
  return (
    <section style={{ display: show ? "flex" : "none" }}>Cashflower</section>
  );
}

CashflowerTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
