import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryButton = ({ category, label, handleMouseOver, handleMouseOut }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // 카테고리에 따라 라우트를 변경하며 state를 전달
    navigate('/starList', {
      state: { categorySelected: category }
    });
  };

  return (
         <div 
            className='atr' 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleCategoryClick}
            >
            {label}
        </div>
  );
};

export default CategoryButton;