import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import * as pay from '../../apis/pay';
import MyPayment from '../../components/mypage/MyPayment';


const UserPaymentContainer = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  
  const confirm = useCallback(async () => {
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");

    const requestData = {
      code: orderId,
      price: amount,
      paymentKey: paymentKey
    };

    try {
      const response = await pay.payInsert(requestData);
      const data = response.data;

      if (response.status !== 200) {
        navigate(`/payments/fail`);
        return;
      }
      // 필요한 추가 작업 수행
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
      navigate(`/payments/fail`);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    confirm();
  }, [confirm]);
  return (
    <MyPayment />
  );
};

export default UserPaymentContainer;