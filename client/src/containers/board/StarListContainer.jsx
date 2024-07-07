import React from 'react';
import { useLocation } from 'react-router-dom';
import ScList from '../../components/board/starBoard/ScList';
import ScList3 from '../../components/board/starBoard/ScList3';

const StarListContainer = () => {
  const location = useLocation();
  const category = location.state?.categorySelected || '';

  return (
    <div>
      {/* <ScList category={category} />
      <h1>아래는 새것</h1> 위에 계속만질께 지우지마세요 - sung*/}
      <ScList3 category={category}/>
    </div>
  );
};


export default StarListContainer;