import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import QnaInsertContainer from '../../containers/board/QnaInsertContainer'

const Insert = () => {
  return (
    <>
        <MainLayout>
          <h1 className='d-flex justify-content-center mb-3 mt-3'>질문 등록</h1>
          <QnaInsertContainer status={'답변 대기'} />
        </MainLayout>
    </>
  )
}

export default Insert