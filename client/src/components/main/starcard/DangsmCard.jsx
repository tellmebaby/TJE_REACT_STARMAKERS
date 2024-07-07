import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import StarCategory1 from './StarCategory1';
import ClipCard from './ClipCard';
import StarCategory2 from './StarCategory2';
import './css/StarCategory2.css';
import StarLink from './StarLink';
import './css/CardContent.css';
import './css/DangsmCard.css';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import { StarLike, toggleLike } from '../../../apis/main/cards';
import * as Swal from '../../../apis/alert'


const DangsmCard = ({ card }) => {
  const { userInfo } = useContext(LoginContext);
  const cardType = card.card ? card.card : 'standard';
  const [showStar, setShowStar] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(card);

      // 페이지 이동
      const navigate = useNavigate()

      const cardRef = useRef(null); // 카드 DOM 참조
      const [rotate, setRotate] = useState({ x: 0, y: 0 }); // 회전 상태

      const handleMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { clientWidth, clientHeight } = target;
    
        // 마우스 위치에 따른 회전 각도 계산
        const rotateY = (offsetX / clientWidth * 50) - 25;
        const rotateX = -(offsetY / clientHeight * 50) + 25;
    
        setRotate({ x: rotateX, y: rotateY });
      };

      const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
      };
    

      useEffect(() => {
        const cardElement = cardRef.current;
        if (cardElement) {
          cardElement.style.transform = `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;
        }
      }, [rotate]);

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
        let check = false;  // `let`으로 선언하여 나중에 값을 변경할 수 있게 함
        if (response.data === 'Liked') {
            check = true;  // 응답이 'Liked'인 경우 check를 true로 설정
        }
    
        setUpdatedCard(updatedCard => ({
            ...updatedCard,
          // 서버 응답이 'liked'일 경우 'liked'로 설정하고, 그렇지 않으면 빈 문자열로 설정
          action: check ? 'Liked' : '',
          // 'liked' 상태에 따라 좋아요 수 증감 처리
          likes: check ? updatedCard.likes + 1 : updatedCard.likes - 1
        }));
      } catch (error) {
        console.error('error by dangsmCard:', error);
      }
    } else {
      Swal.alert("로그인 해주세요", "로그인 화면으로 이동합니다.", "LOGIN",
        () => { navigate("/login") }
      )
    }
  };


  return (
    <div className='click-star' onDoubleClick={handleDoubleClick}>
      <div className='card-container' ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.5s',
        transformStyle: 'preserve-3d'
      }}
      >
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
    </div>
  );
}

export default DangsmCard;