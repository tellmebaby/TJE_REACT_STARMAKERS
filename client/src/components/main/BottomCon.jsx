import React from 'react'
import './css/BottomCon.css';
import PopularMembers from './bottomContainer/PopularMembers';
import BoardCollection from './bottomContainer/BoardCollection';

const BottomCon = () => {
  return (
    <div className='BottomCon-container'>
        <div className='BottomCon-left'>
            <div>
            <spna>인기회원</spna>
            </div>
            <PopularMembers/> 
        </div>
        <div className='BottomCon-right1'>
            <BoardCollection />
        </div>

    </div>
  )
}

export default BottomCon