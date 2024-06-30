import React from 'react';

const CardSlide = ({ cardList, isLoading }) => {
  // cardList와 isLoading을 사용하여 UI를 구성하는 로직
  // 예시 코드를 바탕으로 작성할 경우:

  return (

    
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div id="promotionCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner" id="carousel-inner">
      <div className="cards row">
        {cardList.map(card => (
        <div className="col-md-2 mb-4" key={card.starNo}>
          <div className="card standard">
            <div className="card custom-card" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}>
              <span className="star">&#9733;</span>
              <div className="top-container">
                <div className="left-content">
                  {/* 아이콘에 대한 부분 (icon1, icon2 등)은 이 예시에서 생략되었으므로 실제 데이터에 맞게 추가하세요 */}
                </div>
                <div className="right-content" data-no={card.starNo}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                  </svg>
                </div>
              </div>
              <div className="overlay" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}></div>
              <div className="card-body" data-no={card.starNo}>
                <h5 className="card-title">
                  <img src={`/file/img/${card.userImgId}`} alt="작성자 아이콘" className="author-icon" />
                  {card.title}
                </h5>
                <div className="card-text">{card.content}</div>
                <div className="bottom-container">
                  <div className="field-links">
                    {/* musicBtn, travelBtn 등에 대한 부분은 실제 데이터에 맞게 추가하세요 */}
                  </div>
                  {/* starLinksHtml에 대한 부분은 실제 데이터에 맞게 추가하세요 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        
      )}
    </div>
  );
};

export default CardSlide;