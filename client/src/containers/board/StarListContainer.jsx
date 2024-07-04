import React from 'react';
import { useLocation } from 'react-router-dom';
import ScList from '../../components/board/starBoard/ScList';

const StarListContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const option = queryParams.get('option') || {};

  return (
    <div>
      <ScList option={option} />
    </div>
  );
}

export default StarListContainer;