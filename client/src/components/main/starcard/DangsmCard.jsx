import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarCategory1 from './StarCategory1';
import ClipCard from './ClipCard';
import StarCategory2 from './StarCategory2';
import './css/StarCategory2.css';
import StarLink from './StarLink';
import CardContent from './CardContent';
import './css/CardContent.css';
import './css/DangsmCard.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { StarLike } from '../../../apis/main/cards';

const DangsmCard = ({ card }) => {
  const { userInfo } = useContext(LoginContext);
  const cardType = card.card ? card.card : 'standard';
  const [showStar, setShowStar] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(card);

  const handleDoubleClick = async () => {
    if (userInfo) {
      if (updatedCard.action !== 'liked') {
        setShowStar(true);
        setTimeout(() => {
          setShowStar(false);
        }, 1000); // 1초 후에 star 아이콘 제거
      }
      try {
        const response = await StarLike(userInfo.userNo, updatedCard.starNo);
        console.log(response.data);
        setUpdatedCard({
          ...updatedCard,
          action: response.data.liked ? 'liked' : '',
          likes: response.data.liked ? updatedCard.likes + 1 : updatedCard.likes - 1,
        });
      } catch (error) {
        console.error('error by dangsmCard:', error);
      }
    } else {
      alert("로그인해");
    }
  };

  useEffect(() => {
    console.log('Updated card:', updatedCard);
  }, [updatedCard]);

  return (
    <div className='click-star' onDoubleClick={handleDoubleClick}>
      <div className={`card ${cardType}`} style={{ width: '145px' }}>
        <div className={`Starrr ${showStar ? 'show' : ''}`}><p>⭐️</p></div>
        <div className="cards custom-card" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}>
          <div className="top-container">
            <StarCategory1 card={updatedCard} />
            <ClipCard card={updatedCard} />
          </div>
          <div className="card-overlay" style={{ backgroundImage: `url('/file/img/${card.imgNo}')` }}></div>
          <Link to={`/${card.starNo}`} className="card-body">
            <h5 className="card-title">
              <img src={`/file/img/${card.userImgId}`} alt="작성자 아이콘" className="author-icon" />
              {`${card.title}`}
            </h5>
            {/* <CardContent card={updatedCard} /> */}
            <div className="bottom-container">
              <StarCategory2 card={updatedCard} />
              <StarLink className='starLink' card={updatedCard} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DangsmCard;