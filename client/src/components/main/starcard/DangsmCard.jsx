import React from 'react';
import StarCategory1 from './StarCategory1';
import ClipCard from './ClipCard';
import StarCategory2 from './StarCategory2';
import './css/StarCategory2.css';
import StarLink from './StarLink';
import CardContent from './CardContent';
import './css/CardContent.css';
import './css/DangsmCard.css';

const DangsmCard = ({ card }) => {
  const cardType = card.card ? card.card : 'standard';

  return (
    <div>
      <div className={`card ${cardType}`} style={{ width: '145px' }}>
        <div className="cards custom-card" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}>
          <div className="top-container">
            <StarCategory1 card={card} />
            <ClipCard card={card} />
          </div>
          <div className="overlay" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}></div>
          <div className="card-body">
            <h5 className="card-title">
              <img src={`/file/img/${card.userImgId}`} alt="작성자 아이콘" className="author-icon" />
              {`${card.title}`}
            </h5>
            <CardContent card={card} />
            <div className="bottom-container">
              <StarCategory2 card={card} />
              <StarLink card={card} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DangsmCard;