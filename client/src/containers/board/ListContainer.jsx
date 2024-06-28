import React, { useEffect, useState } from 'react';
import List from '../../components/board/List';
import * as starBoard from '../../apis/starBoard'


const ListContainer = ({ type, optionList, page, option }) => {

  
  // // 🌞 함수
  // const getBoardList = async () => {
  //   // 로딩 시작
  //   setLoading(true)
  //   const response = await boards.list()
  //   const data = await response.data        //⭐boardList
  //   setBoardList(data) // 2. state 가 바뀌면서 update 되어 렌더링을 다시 한다.
  //   setLoading(false)
  //   // 로딩 끝

  // }

  const toBoard = () => {
    switch (type) {
      case 'event': return '/event';
      case 'an': return '/an';
      case 'review': return '/review';
    }
  };

  return (
    <List
      type={type}
      optionList={optionList}
      page={page}
      option={option}
      toBoard={toBoard}
    />
  );
};

export default ListContainer;
