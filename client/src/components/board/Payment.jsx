import React, { useEffect, useRef, useState } from 'react'
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const Payment = () => {
  const [card, setCard] = useState('');
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [amount, setAmount] = useState(0); // 초기 결제 금액 설정
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; // 실제 클라이언트 키로 변경하세요.
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
  const customerKey = generateRandomString();


    const translationMap1 = {
      youtube: '유튜브',
      instagram: '인스타그램',
      afreeca: '아프리카',
      chzzk: '치지직',
    };
  
    const translationMap2 = {
      food: '음식',
      travel: '여행',
      game: '게임',
      music: '음악',
      animal: '동물',
      workOut: '운동',
      asmr: 'ASMR',
      fashion: '패션',
    };

  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(50_000);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div className="container" style={{ width: '860px' }}>
      <div className="header text-center mt-4">
        <h1 className="mt-3 mb-3">결제 정보</h1>
        <p className="text-secondary mb-3">문의사항은 1:1 채팅 또는 Q&A 게시판을 이용해주세요.</p>
      </div>

      <h4>상품정보</h4>
      <div className="section">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">상품</th>
              <td>홍보카드 기간제 상품</td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td>{/* 여기에 starBoard.title 넣기 */}</td>
            </tr>
            <tr>
              <th scope="row">채널</th>
              <td id="category-container">
                {categories.map((category, index) => (
                  <span key={index} className="category-label">{category}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">분야</th>
              <td id="category-container2">
                {categories2.map((category, index) => (
                  <span key={index} className="category-label">{category}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">홍보기간</th>
              <td>{/* 여기에 starBoard.startDate와 starBoard.endDate 넣기 */}</td>
            </tr>
            <tr>
              <th scope="row">결제금액</th>
              <td>{amount}원</td>
            </tr>
            <tr>
              <th scope="row">썸네일 이미지</th>
              <td style={{ width: '85%' }}>
                <img src={`/file/img/YOUR_IMG_NO`} alt="썸네일 이미지" style={{ width: '40%' }} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mt-2"
            onClick={() => (window.location.href = `/page/starCard/starUpdate?starNo=YOUR_STAR_NO`)}
          >
            수정하기
          </button>
        </div>
      </div>

      <h4>회원정보</h4>
      <div className="section">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">이름</th>
              <td style={{ width: '85%' }}>{/* 여기에 user.name 넣기 */}</td>
            </tr>
            <tr>
              <th scope="row">연락처</th>
              <td>{/* 여기에 user.phone 넣기 */}</td>
            </tr>
            <tr>
              <th scope="row">이메일</th>
              <td>{/* 여기에 user.email 넣기 */}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>결제수단</h4>
      <div className="section">
        <div id="payment-widget"></div>
        <div id="agreement"></div>

        <button className="btn btn-primary mt-2 w-100" id="payment-request-button" disabled={buttonDisabled}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default Payment