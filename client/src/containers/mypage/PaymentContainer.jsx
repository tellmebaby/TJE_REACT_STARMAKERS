import React, { useState, useEffect, useContext } from 'react';
import PaymentForm from '../../components/mypage/PaymentForm';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as mypage from '../../apis/mypage';


const PaymentContainer = () => {

  const { userInfo } = useContext(LoginContext);
  const [payList, setPayList] = useState([]);

  console.log("payMent넘어오니 userInfo야");
  console.log(userInfo);

  const getPayList = async () => {
    try {
      const params = {
        userNo : userInfo?.userNo
      }

      const response = await mypage.payList(params);
      const data = response.data;

      console.log("데이터 페이먼트로 넘어와라잉");
      console.log(data);
      console.log("params : ", params);

      setPayList(Array.isArray(data.payList) ? data.payList : []);
      console.log("payList : ", data.payList);
    } catch (error) {
      console.error('payListError:', error);
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.userNo) {
      getPayList();
    }
  }, [userInfo]);

  return <PaymentForm payList={payList} userInfo={userInfo} />;
};

export default PaymentContainer;
