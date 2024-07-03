import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import styles from './css/Payment.module.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import DangsmCard from '../main/starcard/DangsmCard';

const Payment = ({ starBoard, isLoading }) => {

  // http://localhost:3000/payments/success?starNo=141&userNo=1&card=prime&paymentType=NORMAL&orderId=G2L_0Gn3jZbDxrtD7SeXP&paymentKey=tgen_2024070319343372y62&amount=2000

  const { userInfo } = useContext(LoginContext);
  const user = userInfo || {};

  const [selectedDesign, setSelectedDesign] = useState('prime');
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [amount, setAmount] = useState(0); // 초기 결제 금액 설정
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; // 실제 클라이언트 키로 변경하세요.
  const generateRandomString = () => nanoid();
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
      { value: amount },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
    paymentMethodsWidget.on('ready', () => setButtonDisabled(false));
  }, [paymentWidget, amount]);

  useEffect(() => {
    // 초기 데이터 로드
    setCategories(translateCategories(starBoard.category1, translationMap1));
    setCategories2(translateCategories(starBoard.category2, translationMap2));

    setAmount(calculateAmount(starBoard.startDate, starBoard.endDate));
  }, [starBoard]);



  const translateCategories = (categories, translationMap) => {
    if (!categories) return [];
    return categories.split(',').map((category) => {
      return translationMap[category.trim().toLowerCase()] || category.trim();
    });
  };

  const handlePaymentRequest = async () => {
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "홍보카드 기간제 상품",
        customerName: user.name,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/payments/success?starNo=${starBoard.starNo}&userNo=${user.userNo}&card=${selectedDesign}`,
        failUrl: `${window.location.origin}/payments/fail?starNo=${starBoard.starNo}&userNo=${user.userNo}`
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  const formatDateRange = (start, end) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const startDate = new Date(start).toLocaleDateString('ko-KR', options);
    const endDate = new Date(end).toLocaleDateString('ko-KR', options);
    return `${startDate} ~ ${endDate}`;
  };

  const calculateAmount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays + 1) * 1000; // 1일당 1000원
  };

  const handleDesignChange = (event) => {
    setSelectedDesign(event.target.value);
    
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.header} text-center`}>
        <h1 className="mt-3 mb-3">결제 정보</h1>
        <p className="text-secondary mb-3">문의사항은 1:1 채팅 또는 Q&A 게시판을 이용해주세요.</p>
      </div>

      <h4>상품정보</h4>
      <div className={styles.section}>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">상품</th>
              <td>홍보카드 기간제 상품</td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td>{starBoard.title}</td>
            </tr>
            <tr>
              <th scope="row">채널</th>
              <td id="category-container">
                {categories.map((category, index) => (
                  <span key={index} className={styles['category-label']}>{category}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">분야</th>
              <td id="category-container2">
                {categories2.map((category, index) => (
                  <span key={index} className={styles['category-label']}>{category}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">홍보기간</th>
              <td>{formatDateRange(starBoard.startDate, starBoard.endDate)}</td>
            </tr>
            <tr>
              <th scope="row">결제금액</th>
              <td>{amount}원</td>
            </tr>

            <tr>
              <th scope="row">카드 테두리</th>
              <td>
              <input
                  type="radio"
                  id="design1"
                  name="design"
                  value="prime"
                  checked={selectedDesign === 'prime'}
                  onChange={handleDesignChange}
                />
                <label htmlFor="design1">프라임</label>

                　
                <input
                  type="radio"
                  id="design2"
                  name="design"
                  value="gold"
                  checked={selectedDesign === 'gold'}
                  onChange={handleDesignChange}
                />
                <label htmlFor="design2">골드</label>
              </td>
            </tr>


            <tr>
              <th scope="row">카드 예시</th>
              <td style={{ width: '85%' }}>
                {starBoard && starBoard.category1 ? ( 
                  <div style={{ width: '170px' }}>
                    <div className={`card ${selectedDesign}`} style={{ width: '178px' }}>
                      <DangsmCard card={starBoard} />
                    </div>
                  </div>
                ) : (
                  <div>Loading...</div> 
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mt-2"
            onClick={() => (window.location.href = `/starUpdate/${starBoard.starNo}`)}
          >
            수정하기
          </button>
        </div>
      </div>

      <h4>회원정보</h4>
      <div className={styles.section}>
        <table className="table">
          <tbody className={styles.tbody}>
            <tr>
              <th scope="row">이름</th>
              <td style={{ width: '85%' }}>{user.name}</td>
            </tr>
            <tr>
              <th scope="row">연락처</th>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <th scope="row">이메일</th>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>결제수단</h4>
      <div className={styles.section}>
        <div id="payment-widget"></div>
        <div id="agreement"></div>

        <button
          className={`${styles.button} btn btn-primary mt-2 w-100`}
          id="payment-request-button"
          disabled={buttonDisabled}
          onClick={handlePaymentRequest}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Payment;
