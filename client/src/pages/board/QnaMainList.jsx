import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import QnaListContainer from '../../containers/board/QnaListContainer'

const QnaMainList = () => {
    const optionList = [];
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
        <QnaListContainer
        optionList={optionList}
        page={page}
        option={option}/>
    </MainLayout>    
    </>
  )
}

export default QnaMainList