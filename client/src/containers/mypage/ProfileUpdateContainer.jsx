import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import ProfileUpdateForm from '../../components/mypage/ProfileUpdateForm';

const ProfileUpdateContainer = ({ email }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await mypage.select(email);
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, [email]);

  return (
    <>
      <ProfileUpdateForm email={email} user={user} />
    </>
  );
};

export default ProfileUpdateContainer;
