import React from "react";
import { useFetchBanner } from "../useFetchComponent/useFetchBanner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    <div className="container pt-10">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={2500}
        transitionDuration={500}
      >
        {data?.data.map((banner, index) => (
          <div key={index}>
            <h1 className="absolute top-0">{banner.title}</h1>
            <div className="relative w-full">
              <img
                className="w-full rounded-md object-cover"
                src={`http://127.0.0.1:8000/storage/${banner.image_path}`}
                alt={banner.title}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
