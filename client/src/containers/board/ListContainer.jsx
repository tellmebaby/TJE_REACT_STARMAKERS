import React, { useEffect, useState } from 'react';
import List from '../../components/board/List';
import * as starBoard from '../../apis/starBoard'


const ListContainer = ({ type, optionList, page, option }) => {

  const [boardList, setBoardList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getBoardList = async () => {
    setLoading(true);
    const response = await starBoard.list(type, page, option);
    // const data = await response.data
    setBoardList(response.list || []);
    console.log(response);
    setLoading(false);
  };

  useEffect(() => {
    getBoardList();
  }, [type, page, option]);

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
      toBoard={toBoard()}
      boardList={boardList}
      loading={isLoading}
    />
  );
};

export default ListContainer;
