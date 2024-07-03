import React, { useEffect, useState } from 'react'
import * as starBoards from '../../apis/starBoard'
import Payment from '../../components/board/Payment'
import { useNavigate, useSearchParams } from "react-router-dom";

const StarPaymentContainer = ({ starNo }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [starBoard, setStarBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoard = async () => {
    setLoading(true)
    const response = await starBoards.select(starNo)
    const data = await response.data

    setStarBoard(data.starBoard)
    setLoading(false)

  }

  useEffect(() => {
    if (starNo > 0) {
      getBoard();
    } else {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      async function confirm() {
        const response = await fetch("/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
          // 결제 실패 비즈니스 로직을 구현하세요.
          // navigate(`/payments/fail?message=${json.message}&code=${json.code}`);
          return;
        } else {
          // 결제 성공 비즈니스 로직을 구현하세요.
        }
      }
      confirm();
    }
  }, [starNo, getBoard, searchParams]);


  return (
    starNo > 0 ? (
      <Payment starBoard={starBoard} isLoading={isLoading} />
    ) : (
      <div>스타 정보가 없습니다.</div>
    )
  )
}

export default StarPaymentContainer