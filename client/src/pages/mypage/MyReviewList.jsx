import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import MyReviewListContainer from '../../containers/mypage/MyReviewListContainer'

const MyReviewList = () => {
  return (
    <>
        <MainLayout>
            <MyReviewListContainer />
        </MainLayout>
    </>
  )
}

export default MyReviewList