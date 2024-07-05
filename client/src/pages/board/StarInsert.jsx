import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import StarInsertContainer from '../../containers/board/StarInsertContainer'

const StarInsert = () => {
  return (
    <>
        <MainLayout>
          <StarInsertContainer type={"starCard"}/>
        </MainLayout>
    </>
  )
}

export default StarInsert