import React from 'react'

const StarCategory1 = ({card}) => {

     // 카테고리 데이터를 쉼표로 나눔
  const categories = card.category1.split(',');

  // 카테고리에 따라 이미지를 선택하는 함수
  const getCategoryIcon = (category) => {
    switch (category.trim()) {
      case 'youtube':
        return <img src="/img/icon/youtube.png" alt="유튜브 아이콘" className="content-icon" />;
      case 'chzzk':
        return <img src="/img/icon/chzzk.png" alt="치즈크 아이콘" className="content-icon" />;
      case 'afreeca':
        return <img src="/img/icon/afreeca.png" alt="아프리카 아이콘" className="content-icon" />;
      case 'instagram':
        return <img src="/img/icon/instagram.png" alt="아프리카 아이콘" className="content-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className='left-content'>
        {categories.map((category, index) => (
        <span key={index}>{getCategoryIcon(category)}</span>
      ))}
    </div>
  )
}

export default StarCategory1