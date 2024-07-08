import React, { useCallback, useEffect, useState } from 'react'
import * as starBoards from '../../apis/starBoard'
import Payment from '../../components/board/Payment'
import { useNavigate, useSearchParams } from "react-router-dom";
import * as pay from '../../apis/pay';


const StarPaymentContainer = ({ starNo }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [starBoard, setStarBoard] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const getBoard = useCallback(async (starNo) => {
    setLoading(true);
    try {
      const response = await starBoards.select(starNo);
      const data = response.data;
      setStarBoard(data.starBoard);
    } catch (error) {
      console.error("별 게시판을 가져오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (starNo > 0) {
      getBoard(starNo);
    } else {
      setStatus(1);
      confirm();
    }
  }, [starNo]);

  const confirm = useCallback(async () => {
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");
    const starNoParam = searchParams.get("starNo");
    const userNo = searchParams.get("userNo");
    const card = searchParams.get("card");

    const requestData = {
      code: orderId,
      price: amount,
      paymentKey: paymentKey,
      starNo: starNoParam,
      userNo: userNo,
      card : card
    };

    try {
      const response = await pay.payInsert(requestData);
      const data = response.data;

      if (response.status !== 200) {
        navigate(`/payments/fail`);
        return;
      }

      const starNo_select = data.pay.starNo;
      getBoard(starNo_select);
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
      navigate(`/payments/fail`);
    }
  }, [searchParams, navigate, getBoard]);

  return (
    <Payment starBoard={starBoard} isLoading={isLoading} status={status} />
  );
};

export default StarPaymentContainer;