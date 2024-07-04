import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StarCategory1 from './StarCategory1';
import ClipCard from './ClipCard';
import StarCategory2 from './StarCategory2';
import './css/StarCategory2.css';
import StarLink from './StarLink';
import './css/CardContent.css';
import './css/DangsmCard.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { StarLike } from '../../../apis/main/cards';
import * as Swal from '../../../apis/alert'


const DangsmCard = ({ card }) => {
  const { userInfo } = useContext(LoginContext);
  const cardType = card.card ? card.card : 'standard';
  const [showStar, setShowStar] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(card);

      // 페이지 이동
      const navigate = useNavigate()

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
      Swal.alert("로그인 해주세요", "로그인 화면으로 이동합니다.", "LOGIN",
        () => { navigate("/login") }
    )
    }
  };

  useEffect(() => {
    // console.log('Updated card:', updatedCard);
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
              <div className='starCategory2-con'>
                <StarCategory2 card={updatedCard} />
              </div>
              <div className='starLink-con'>
                <StarLink card={updatedCard} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DangsmCard;