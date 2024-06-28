import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import QnaListForm from '../../components/mypage/QnaListForm';

const QnaListContainer = () => {
  // state
  const [qnaList, setQnaList] = useState([]);
  const [user, setUser] = useState(null); // user 상태 추가

  // 함수
  const getQnaList = async () => {
    try {
      const response = await mypage.qnaList();
      const data = response.data;
      setQnaList(data);
      console.log('QnaList:', data); // 데이터 확인
    } catch (error) {
      console.error('Error fetching QnA list:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await mypage.select(); // user 정보를 가져오는 API 호출
      const userData = response.data;
      setUser(userData);
      console.log('UserData:', userData); // 데이터 확인
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // 로그인한 사용자의 QnA 필터링
  const filterQnaList = (qnaList, user) => {
    if (!user) return [];
    return qnaList.filter(qna => qna.userNo === user.userNo); // 필터링 조건 확인
  };

  // hook
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getQnaList();
    };

    fetchData();
  }, []);

  const filteredQnaList = filterQnaList(qnaList, user);
  console.log('Filtered QnaList:', filteredQnaList); // 필터링된 리스트 확인

  return <QnaListForm qnaList={filteredQnaList} user={user} />;
};

export default QnaListContainer;
