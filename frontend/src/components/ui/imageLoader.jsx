import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Blurhash } from "react-blurhash";
const ImageLoader = ({ hashValue, imageSrc, imageALT = "Image" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [imageSrc]);

  return (
    <div>
      {!imageLoaded && (
        <Blurhash
          hashValue={hashValue}
          width="100%"
          height="100%"
          resolutionX={128}
          resolutionY={128}
          punch={1}
        />
      )}
      {imageLoaded && <img src={imageSrc} alt={imageALT} />}
    </div>
  );
};

ImageLoader.propTypes = {
  hashValue: propTypes.string,
  imageSrc: propTypes.string,
  imageALT: propTypes.string,
};

export default ImageLoader;
