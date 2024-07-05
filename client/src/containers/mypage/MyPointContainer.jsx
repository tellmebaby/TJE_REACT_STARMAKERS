import React from 'react'
import MyPointForm from '../../components/mypage/MyPointForm'

const MyPointContainer = () => {

  const userPayList= [];
  
  return (
    <MyPointForm userPayList={userPayList}/>
  )
}

export default MyPointContainer