import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import MyReviewListForm from '../../components/mypage/MyReviewListForm';

const MyReviewListContainer = () => {
  const [reviewList, setReviewList] = useState([]);
  const [user, setUser] = useState(null);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 1, itemsPerPage: 10 });

  const [pageNo, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const getReviewList = async () => {
    try {
      const params = {
        page: pageNo,
        keyword: keyword,
        user : user
      }
      const response = await mypage.reviewList(params);
      const data = response.data;
      console.log("review");
      console.log(data);

      setReviewList(Array.isArray(data.reviewList) ? data.reviewList : []);
      setPageInfo(data.page || {});
    } catch (error) {
      console.error('Error fetching review list:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await mypage.select();
      const userData = response.data;
      setUser(userData.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getReviewList();
    };

    fetchData();
  }, [pageNo, keyword]);

  return user ? (
    <MyReviewListForm
      reviewList={reviewList}
      user={user}
      page={pageInfo}
      setPage={setPage}
      setKeyword={setKeyword}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default MyReviewListContainer;
