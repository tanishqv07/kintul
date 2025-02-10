import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ title, children }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default Carousel;
