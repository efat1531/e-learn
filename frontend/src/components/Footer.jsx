import React from "react";
import FooterMain from "./Footer/FooterMain";
import PropTypes from "prop-types";

const Footer = ({ children = null }) => {
  return <FooterMain />;
};

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
