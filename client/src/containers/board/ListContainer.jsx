import React from 'react';
import List from '../../components/board/List';

const ListContainer = ({ type, optionList, page, option, param }) => {
  return (
    <List
      type={type}
      optionList={optionList}
      page={page}
      option={option}
      param={param}
    />
  );
};

export default ListContainer;
