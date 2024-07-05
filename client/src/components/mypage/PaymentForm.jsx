import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../components/mypage/css/PaymentForm.module.css';

const PaymentForm = ({ payList, userInfo }) => {
  const [visibleItems, setVisibleItems] = useState(4);
  console.log(userInfo);

  const user = userInfo;

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const userPayList = Array.isArray(payList) ? payList.filter(payment => payment.userNo === user.userNo) : [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className={styles.sideMenu}>
            <div className={styles.navLinks}>
              <Link to="/mypage/profile"><i className="fa-solid fa-user"></i>회원 정보</Link>
              <Link to="/mypage/payment" className={styles.active}><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
              <Link to="/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
              <Link to="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
              <Link to="/mypage/qnaList"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
              <Link to="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className={styles.list}>
            <h2 style={{ color: '#000' }}>결제 내역 조회</h2>
            <li>홍보글 승인 이전에만 전체 금액 환불이 가능합니다.</li>
            <li>홍보글이 승인된 경우, 관리자 확인 후 일부 금액만 환불 가능 또는 환불 불가할 수 있습니다.</li>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th colSpan="4"></th>
                </tr>
                <tr>
                  <th style={{ width: '150px' }}>결제번호</th>
                  <th style={{ width: '350px' }}>결제상품</th>
                  <th style={{ width: '100px' }}>결제금액</th>
                  <th style={{ width: '200px' }}>결제일자</th>
                </tr>
              </thead>
              <tbody id="payment-list">
                {userPayList.length === 0 ? (
                  <tr>
                    <td colSpan="4" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                      조회된 게시글이 없습니다.
                    </td>
                  </tr>
                ) : (
                  userPayList.slice(0, visibleItems).map((payment) => (
                    <React.Fragment key={payment.code}>
                      <tr key={`${payment.code}-row1`}>
                        <td className="border-0 pt-4">{payment.code}</td>
                        <td className="border-0 pt-4">{payment.productTitle}</td>
                        <td className="border-0 pt-4">
                          <span>{payment.price.toLocaleString()}원</span>
                        </td>
                        <td className="border-0 pt-4">{new Date(payment.regDate).toLocaleDateString()}</td>
                      </tr>
                      <tr key={`${payment.code}-row2`}>
                        <td colSpan="3"></td>
                        <td>
                          <div className={styles.buttonContainer}>
                            <input
                              type="button"
                              className={`${styles.btnReview} ${payment.status === '결제완료' ? styles.approved : styles.pending}`}
                              value={payment.status}
                              disabled
                            />
                            <button className={styles.btnRefund}>환불요청</button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
            {visibleItems < userPayList.length && (
              <div className={styles.loadMoreBtn}>
                <button type="button" onClick={loadMore}>더보기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
