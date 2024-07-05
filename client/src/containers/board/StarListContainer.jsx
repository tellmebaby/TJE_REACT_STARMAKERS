import React from 'react';
import { useLocation } from 'react-router-dom';
import ScList from '../../components/board/starBoard/ScList';

const StarListContainer = () => {
  const location = useLocation();
  const category = location.state?.categorySelected || '';

  return (
    <div>
      <ScList category={category} />
    </div>
  );
};


export default StarListContainer;