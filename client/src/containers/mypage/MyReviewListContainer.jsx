import React, { useContext, useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import MyReviewListForm from '../../components/mypage/MyReviewListForm';
import { LoginContext } from '../../contexts/LoginContextProvider';

const MyReviewListContainer = () => {
  const { userInfo } = useContext(LoginContext);

  const [reviewList, setReviewList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageNumber: 1, itemsPerPage: 10 });

  const [pageNo, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  console.log("리뷰");
  console.log(reviewList);
  console.log("리뷰유저");
  console.log(userInfo?.userNo);
  console.log("리뷰페이지");
  console.log(pageInfo);

  const getReviewList = async () => {
    try {
      const params = {
        page: pageNo,
        keyword: keyword,
        type: 'review',
        userNo: userInfo?.userNo
      };
      const response = await mypage.reviewList(params); // await 키워드 추가
      const data = response.data;
      console.log('review');
      console.log(data);

      setReviewList(Array.isArray(data.starList) ? data.starList : []);
      setPageInfo(data.page || {});
    } catch (error) {
      console.error('Error fetching review list:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  };

  useEffect(() => {
    if (userInfo?.userNo) {
      getReviewList();
    }
  }, [userInfo, pageNo, keyword]);

  return userInfo ? (
    <MyReviewListForm
      reviewList={reviewList}
      setReviewList={setReviewList}
      user={userInfo}
      page={pageInfo}
      setPage={setPage}
      setKeyword={setKeyword}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default MyReviewListContainer;
