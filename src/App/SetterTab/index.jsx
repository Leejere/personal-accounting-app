import React from "react";

import PropTypes from "prop-types";

export default function SetterTab({ show }) {
  return <section style={{ display: show ? "flex" : "none" }}>Setter</section>;
}

SetterTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
