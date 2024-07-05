import React from 'react';
import DangsmCard from '../../main/starcard/DangsmCard';
import './css/StarCardList.css';

const StarCardList = ({ data }) => {
  return (
    <div>
      <div className='star-card-list'>
        {data.map((item) => (
          <div key={item.starNo} className='star-card-item' style={{ width: '170px' }}>
            <DangsmCard card={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarCardList;