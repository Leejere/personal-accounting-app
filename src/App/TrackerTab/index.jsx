import React from "react";

import PropTypes from "prop-types";

export default function TrackerTab({ show }) {
  return <section style={{ display: show ? "flex" : "none" }}>Tracker</section>;
}

TrackerTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
