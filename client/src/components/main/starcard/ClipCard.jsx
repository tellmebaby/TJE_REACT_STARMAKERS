import React, { useState } from 'react';
import './css/ClipCard.css';

const ClipCard = ({ card }) => {
  const [clipboardIconVisible, setClipboardIconVisible] = useState(false);

  const handleMouseEnter = () => {
    setClipboardIconVisible(true);
  };

  const handleMouseLeave = () => {
    setClipboardIconVisible(false);
  };

const handleClick = async (event, cardNo) => {
  event.stopPropagation();
  const baseURL = window.location.origin;
  const urlToCopy = `${baseURL}/starNo=${cardNo}`;

  try {
    await navigator.clipboard.writeText(urlToCopy);
    alert('URL이 클립보드에 복사되었습니다: ' + urlToCopy);
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    alert('클립보드 복사에 실패했습니다.');
  }
};

  return (
    <div
      className="right-content"
      data-no={card.starNo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {!clipboardIconVisible && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      )}
      {clipboardIconVisible && (
        <i className="bi bi-clipboard2-plus-fill clipboard-icon"></i>
      )}
    </div>
  );
};

export default ClipCard;