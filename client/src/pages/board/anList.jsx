import React from 'react';
import ListContainer from '../../containers/board/ListContainer';
import MainLayout from '../../layouts/MainLayout';

const anList = () => {
  const optionList = [/* ... 옵션 리스트 ... */];
  const page = {
    first: 1,
    prev: 1,
    start: 1,
    end: 10,
    next: 2,
    last: 10,
    page: 1,
  };
  const option = {
    code: '', // 초기값 설정
    keyword: '', // 초기값 설정
  };

  return (
    <>
      <MainLayout>

        <ListContainer
          type="an"
          optionList={optionList}
          page={page}
          option={option}
          toBoard={"/an"}
        />
      </MainLayout>
    </>
  );
};

export default anList;
