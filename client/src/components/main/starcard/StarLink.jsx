import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import './css/StarLink.css';

const StarLink = ({ card }) => {
  const { isLogin } = useContext(LoginContext);
  const [likeCount, setLikeCount] = useState(card.likes);
  const [starType, setStarType] = useState('');

  useEffect(() => {
    if (!card) return; // card가 없으면 아무 작업도 수행하지 않음
  
    if (card.likes != null) {
      setLikeCount(card.likes);
    }
  
    if (isLogin && card.action && card.action.toLowerCase() === 'liked') {
      setStarType(<i id="changeStar" className="fa-solid fa-star"></i>);
      // console.log('변형감지 별을 채운다');
    } else if (isLogin) {
      setStarType(<i id="changeStar" className="fa-regular fa-star"></i>);
      // console.log('변형감지 별을 비워버린다');
    }
  }, [card, isLogin]); // 의존성 배열에 card 전체를 포함시켜 card 객체의 변화를 감지

  const likeVar = likeCount < 100 ? likeCount : (likeCount * 0.001).toFixed(1) + 'k';
  const viewVar = card.views < 100 ? card.views : (card.views * 0.001).toFixed(1) + 'k';

  return (
    <div className="star-links liked" data-no={card.starNo}>
      {isLogin ? (
        <>
          {starType}
          <span className="count">{likeVar} like</span>
        </>
      ) : (
        <span className="count">{viewVar} view</span>
      )}
    </div>
  );
};

export default StarLink;