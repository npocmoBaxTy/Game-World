import Slider from "react-slick";

interface ISlider {
  children: React.ReactNode;
  dots?: boolean;
  slides?: number;
  arrows?: boolean;
}
const SimpleSlider: React.FC<ISlider> = ({
  children,
  slides,
  dots,
  arrows,
}) => {
  const settings = {
    dots: dots || false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: slides || 1,
    slidesToScroll: 1,
    arrows: arrows || false,
  };
  return (
    <div className="slider-container w-full">
      <Slider {...settings} className="w-full">
        {children}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
