import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import QnaListForm from '../../components/mypage/QnaListForm';

const QnaListContainer = () => {
  const [qnaList, setQnaList] = useState([]);
  const [user, setUser] = useState(null);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 1, itemsPerPage: 10 }); // 초기 상태 빈 객체로 설정
  const [pageNo, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const getQnaList = async () => {
    try {
      const params = {
        page: pageNo,
        keyword: keyword
      };
      const response = await mypage.qnaList(params);
      const data = response.data;

      console.log("데이터 확인");
      console.log(data);

      setQnaList(Array.isArray(data.qnaList) ? data.qnaList : []);
      setPageInfo(data.page || {}); // response.page가 없을 경우 빈 객체로 설정
      console.log('QnaList:', data); // 데이터 확인
      console.log('pageNo:', pageNo); // 데이터 확인
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
      setLoading(false); // 데이터 로딩 후 로딩 상태 false로 설정
    };

    fetchData();
  }, [pageNo, keyword]);

  useEffect(() => {
    console.log('Updated QnaList:', qnaList);
    console.log('Updated User:', user);
  }, [qnaList, user]);

  return (
    loading ? <div>Loading...</div> :
    user && (
      <QnaListForm
        qnaList={qnaList}
        user={user}
        page={pageInfo}
        setPage={setPage}
        setKeyword={setKeyword}
      />
    )
  );
};

export default QnaListContainer;
