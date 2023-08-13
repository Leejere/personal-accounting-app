import React from "react";

import PropTypes from "prop-types";

export default function RecorderTab({ show }) {
  return (
    <section style={{ display: show ? "flex" : "none" }}>Recorder</section>
  );
}

RecorderTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
