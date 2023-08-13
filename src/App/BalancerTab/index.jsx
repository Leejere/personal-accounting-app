import React from "react";

import PropTypes from "prop-types";

export default function BalancerTab({ show }) {
  return (
    <section style={{ display: show ? "flex" : "none" }}>Balancer</section>
  );
}

BalancerTab.propTypes = {
  show: PropTypes.bool.isRequired,
};
