import React, { useContext, useEffect, useState } from 'react';
import PromotionForm from '../../components/mypage/PromotionForm';
import * as mypage from '../../apis/mypage';
import { LoginContext } from '../../contexts/LoginContextProvider';

const PromotionContainer = () => {
  const { userInfo } = useContext(LoginContext);
  const [promotionList, setPromotionList] = useState([]);

  console.log("넘오오냐");
  console.log(userInfo?.userNo);

  const getPromotionList = async () => {
    try {
      const params = {
        userNo: userInfo?.userNo
      };
      console.log("안녕");
      console.log(userInfo.userNo);

      const response = await mypage.promotionList(params);
      const data = response.data;

      console.log("프로모션리스트 데이터 확인");
      console.log(data);

      setPromotionList(Array.isArray(data.promotionList) ? data.promotionList : []);
      console.log("promotionList : ", data.promotionList);
    } catch (error) {
      console.error('promotionListError:', error);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.userNo) {
      getPromotionList();
    }
  }, [userInfo]); // userInfo가 변경될 때마다 실행되도록 설정

  if (!userInfo) {
    return null; // 또는 다른 적절한 처리를 추가
  }

  return (
    <>
      <PromotionForm promotionList={promotionList} userInfo={userInfo} />
    </>
  );
};

export default PromotionContainer;
