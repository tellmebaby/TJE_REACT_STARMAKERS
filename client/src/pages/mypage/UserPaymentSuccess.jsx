import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as pay from '../../apis/pay'

const UserPaymentSuccess = () => {
    
    
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  
  const confirm = useCallback(async () => {
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");
    const userNo = searchParams.get("userNo");

    const requestData = {
      code: orderId,
      point: amount,
      paymentKey: paymentKey,
      type: "충전",
      userNo: userNo
    };

    try {
      const response = await pay.pointAdd(requestData);
      const data = response.data;

      if (response.status !== 200) {
        navigate(`/payments/fail?aa`);
        return;
      }else{
        navigate(`/mypage/myPoint`);
        return;
      }
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
    //   navigate(`/payments/fail`);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    confirm();
  }, [confirm]);



    return (
        <>
        <h1>결제성공</h1>
        </>
    );
}

export default UserPaymentSuccess;
