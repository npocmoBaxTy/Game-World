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
    slidesToShow: slides || 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: arrows || false,
    responsive: [
      {
        breakpoint: 1920, // для экранов шириной 1920px и выше
        settings: {
          slidesToShow: slides || 4, // показывать 4 слайда
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // для экранов шириной 1024px и выше
        settings: {
          slidesToShow: 3, // показывать 3 слайда
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // для экранов шириной 768px и выше
        settings: {
          slidesToShow: 2, // показывать 2 слайда
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // для экранов шириной 1920px и выше
        settings: {
          slidesToShow: 2, // показывать 2 слайда
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // для экранов шириной 480px и выше
        settings: {
          slidesToShow: 1, // показывать 1 слайд
          slidesToScroll: 1,
        },
      },
    ],
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
