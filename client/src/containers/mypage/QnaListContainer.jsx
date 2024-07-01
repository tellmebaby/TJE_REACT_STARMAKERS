import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import QnaListForm from '../../components/mypage/QnaListForm';

const QnaListContainer = () => {
  const [qnaList, setQnaList] = useState([]);
  const [user, setUser] = useState(null);

  const getQnaList = async () => {
    try {
      const response = await mypage.qnaList();
      const data = response.data;
      setQnaList(Array.isArray(data) ? data : []);
      console.log('QnaList:', data); // 데이터 확인
    } catch (error) {
      console.error('Error fetching QnA list:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await mypage.select(); // user 정보를 가져오는 API 호출
      const userData = response.data;
      setUser(userData.user); // userData.user로 설정
      console.log('UserData:', userData); // 데이터 확인
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getQnaList();
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated QnaList:', qnaList);
    console.log('Updated User:', user);
  }, [qnaList, user]);

  return user ? <QnaListForm qnaList={qnaList} user={user} /> : <div>Loading...</div>;
};

export default QnaListContainer;
