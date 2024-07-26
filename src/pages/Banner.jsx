import React from 'react';
import { useFetchBanner } from '../useFetchComponent/useFetchBanner';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-0 top-1/2 p-2 px-4 bg-gray-700 text-white rounded-full shadow-md z-20 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transform -translate-y-1/2 animate-slideInLeft"
      onClick={onClick}
    >
      &#10094;
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-0  top-1/2 p-2 px-4 bg-gray-700 text-white rounded-full shadow-md z-20 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transform -translate-y-1/2 animate-slideInRight"
      onClick={onClick}
    >
      &#10095;
    </button>
  );
};

const Banner = () => {
  const { data, isFetching, isLoading, error } = useFetchBanner();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <div className="container pt-10 relative z-0 group">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={2500}
        transitionDuration={500}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {data?.data.map((banner, index) => (
          <div key={index} className="relative">
            <img className="w-full lg:h-[80vh] lg:object-center md:h-[350px] h-[ rounded-xl object-cover" src={`http://127.0.0.1:8000/storage/${banner.image_path}`} alt={banner.title} />
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full flex justify-between items-center">
              <div>
                <h1 className="text-white text-xl font-bold">{banner.title}</h1>
                <p className="text-white">{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
