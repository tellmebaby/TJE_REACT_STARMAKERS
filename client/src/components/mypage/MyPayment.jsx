import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { LoginContext } from '../../contexts/LoginContextProvider';
import styles from '../board/css/Payment.module.css';

const MyPayment = () => {
  const { userInfo } = useContext(LoginContext);
  const location = useLocation();
  const { amount } = location.state || {};
  const [user, setUser] = useState({});
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
  const customerKey = useMemo(() => nanoid(), []); // useMemo를 사용해 customerKey를 한 번만 생성

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

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
  }, [widgetClientKey, customerKey]);

  useEffect(() => {
    if (paymentWidget) {
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
    }
  }, [paymentWidget, amount]);




  const handlePaymentRequest = async () => {
    if (user) {
      try {
        await paymentWidget?.requestPayment({
          orderId: nanoid(),
          orderName: "[당스만]포인트 충전",
          customerName: user.name,
          customerEmail: user.email,
          successUrl: `${window.location.origin}/UserPayment/success?`,
          failUrl: `${window.location.origin}/payments/fail?`
        });
      } catch (error) {
        console.error("Error requesting payment:", error);
      }
    }
  };



  return (
    <div className={styles.container}>
      <div className={`${styles.header} text-center`}>
      <h1 className="mt-3 mb-3">결제 정보</h1>
      <p className="text-secondary mb-3">문의사항은 1:1 채팅 또는 Q&A 게시판을 이용해주세요.</p>
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

export default MyPayment;
