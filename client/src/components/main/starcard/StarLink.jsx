import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import './css/StarLink.css';

const StarLink = ({ card }) => {
  const { isLogin } = useContext(LoginContext);
  const [likeCount, setLikeCount] = useState(card.likes);
  const [starType, setStarType] = useState('');

  useEffect(() => {
    setLikeCount(card.likes);
    if (isLogin && card.action == 'Liked') {
      setStarType(<i id="changeStar" className="fa-solid fa-star"></i>)
      // console.log('변형감지 별을 채운다');
    } else if (isLogin) {
      setStarType(<i id="changeStar" className="fa-regular fa-star"></i>)
      // console.log('변형감지 별을 비워버린다');
    }
  }, [card.likes, card.action, isLogin])

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