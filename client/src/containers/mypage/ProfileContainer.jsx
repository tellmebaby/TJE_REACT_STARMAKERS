import React, { useEffect, useState } from 'react'
import * as mypage   from '../../apis/mypage'
import ProfileForm from '../../components/mypage/ProfileForm'



const ProfileContainer = ({ email }) => {
  // state
  const [user, setUser] = useState({})

  // 함수
  const getUser = async () => {
    const response = await mypage.select(email)
    const data = await response.data
    console.log(data);
    setUser(data)
  }

  // hook
  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
        <ProfileForm email={email} user={user} />
    </>
  )
}

export default ProfileContainer