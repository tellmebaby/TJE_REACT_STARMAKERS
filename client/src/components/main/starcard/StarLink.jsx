import React, { useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContextProvider'; // 경로를 실제 파일 위치로 변경하세요
import './css/StarLink.css';

const StarLink = ({ card }) => {
  const { isLogin } = useContext(LoginContext);

  let starIconType = '';
  if (isLogin && card.action === 'liked') {
    starIconType = <i id="changeStar" className="fa-solid fa-star"></i>;
  } else if (isLogin) {
    starIconType = <i id="changeStar" className="fa-regular fa-star"></i>;
  }

  const likeVar = card.likes < 100 ? card.likes : (card.likes * 0.001).toFixed(1) + 'k';
  const viewVar = card.views < 100 ? card.views : (card.views * 0.001).toFixed(1) + 'k';

  return (
    <div className="star-links liked" data-no={card.starNo}>
      {isLogin ? (
        <>
          {starIconType}
          <span className="count">{likeVar} like</span>
        </>
      ) : (
        <span className="count">{viewVar} view</span>
      )}
    </div>
  );
};

export default StarLink;