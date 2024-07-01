import React from 'react';
import Slider from 'react-slick';
import DangsmCard from './starcard/DangsmCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CardSlide = ({ cardList, isLoading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
        <div className="container" id="promotionCarousel">
          <div className='cards row' >
          <Slider {...settings}>
            {cardList.map(card => (
              <div key={card.starNo} className=''style={{ width: '170px' }}>
                <div className="card standard" style={{ width: '178px' }}>
                  <DangsmCard card={card} />
                </div>
              </div>
            ))}
          </Slider>

          </div>
        </div>
      )}
    </div>
  );
};

export default CardSlide;