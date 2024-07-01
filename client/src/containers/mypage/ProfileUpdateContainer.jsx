import React, { useContext, useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import ProfileUpdateForm from '../../components/mypage/ProfileUpdateForm';

const ProfileUpdateContainer = () => {
  const [user, setUser] = useState(null); // 초기 상태를 null로 설정

  const getUser = async () => {
    try {
      const response = await mypage.select(user);
      const data = response.data;
      setUser(data.user); // 사용자 정보를 상태로 저장
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser(); // 컴포넌트가 마운트될 때 사용자 정보 조회
  }, []);

  if (!user) {
    return null; // user 정보가 없을 때는 아무것도 렌더링하지 않음
  }

  return (
    <ProfileUpdateForm user={user} />
  );
};

export default ProfileUpdateContainer;
