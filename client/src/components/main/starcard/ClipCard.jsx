import React, { useState } from 'react';
import './css/ClipCard.css';

const ClipCard = ({ card }) => {
  const [clipboardIconVisible, setClipboardIconVisible] = useState(false);
  const [clipboardCardNo, setClipboardCardNo] = useState(null);

  const handleMouseEnter = (cardNo) => {
    setClipboardIconVisible(true);
    setClipboardCardNo(cardNo);
  };

  const handleMouseLeave = () => {
    setClipboardIconVisible(false);
    setClipboardCardNo(null);
  };

  const handleClick = (event, cardNo) => {
    event.stopPropagation();
    const textArea = document.createElement('textarea');
    textArea.value = `http://localhost:8080/page/starCard/starRead?starNo=${cardNo}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('클립보드에 복사되었습니다.');
  };

  return (
    <div
      className="right-content"
      data-no={card.starNo}
      onMouseEnter={() => handleMouseEnter(card.starNo)}
      onMouseLeave={handleMouseLeave}
      onClick={(event) => handleClick(event, card.starNo)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
      </svg>
      {clipboardIconVisible && clipboardCardNo === card.starNo && (
        <i className="bi bi-clipboard2-plus-fill clipboard-icon rotate-180"></i>
      )}
    </div>
  );
};

export default ClipCard;