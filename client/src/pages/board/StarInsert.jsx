import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import StarInsertContainer from '../../containers/board/StarInsertContainer'

const StarInsert = () => {
  return (
    <>
        <MainLayout>
          <h1 className='d-flex justify-content-center mb-3 mt-3'>홍보 등록</h1>
          <StarInsertContainer type={"starCard"}/>
        </MainLayout>
    </>
  )
}

export default StarInsert