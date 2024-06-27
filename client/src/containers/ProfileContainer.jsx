import React, { useEffect, useState } from 'react'
import Profile from '../components/Mypage/ProfileForm'
import * as mypage   from '../apis/mypage'


const ProfileContainer = ({ email }) => {
  // state
  const [users, setUsers] = useState({})

  // 함수
  const getUser = async () => {
    const response = await mypage.select(email)
    const data = await response.data
    console.log(data);
    setUsers(data)
  }

  // hook
  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
        <Profile email={email} users={users} />
    </>
  )
}

export default ProfileContainer