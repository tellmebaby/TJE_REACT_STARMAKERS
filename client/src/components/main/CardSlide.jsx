import React from 'react';
import Slider from 'react-slick';
import DangsmCard from './starcard/DangsmCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./css/CardSlide.css";

const CardSlide = ({ cardList, isLoading }) => {
  const settings = {
    centerMode: true,
    centerPadding: '0', // 필요에 따라 패딩 조절
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='slider-container'>
          <Slider {...settings}>
            {cardList.map(card => (
              <div key={card.starNo} className='star-card-slide'>
                  <DangsmCard card={card} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default CardSlide;