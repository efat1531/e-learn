import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const SingleCourseLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

SingleCourseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SingleCourseLayout;
