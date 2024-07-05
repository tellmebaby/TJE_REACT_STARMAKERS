import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../mypage/css/Promotion.module.css';

const PromotionForm = ({ promotionList, userInfo }) => {
  const [visibleItems, setVisibleItems] = useState(4);

  console.log("ddd");
  console.log(promotionList);
  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const userNo = userInfo?.userNo;
  const userPromotionList = Array.isArray(promotionList) ? promotionList.filter(promotion => promotion.userNo === userNo) : [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className={styles.sideMenu}>
            <div className={styles.navLinks}>
              <Link to="/mypage/profile"><i className="fa-solid fa-user"></i>회원 정보</Link>
              <Link to="/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
              <Link to="/mypage/promotion" className={styles.active}><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
              <Link to="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
              <Link to="/mypage/qnaList"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
              <Link to="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className={styles.list}>
            <Link to="/mypage/promotion">
              <h2 style={{ color: '#000' }} className={styles.juaRegular}>홍보글</h2>
            </Link>
            <Link to="/mypage/myReviewList">
              <h2 style={{ color: '#545454' }} className={styles.juaRegular}>이벤트 후기</h2>
            </Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '350px' }}>제목</th>
                <th style={{ width: '350px' }}>채널</th>
                <th style={{ width: '100px' }}>결제금액</th>
                <th style={{ width: '100px' }}>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {userPromotionList.length === 0 ? (
                <tr>
                  <td colSpan="4" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                    조회된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                userPromotionList.slice(0, visibleItems).map((promotion) => (
                  <React.Fragment key={promotion.starNo}>
                    <tr key={`${promotion.starNo}-row1`}>
                      <td className="border-0 pt-4">
                        <Link to={`/${promotion.starNo}`}>{promotion.title}</Link>
                      </td>
                      <td className="border-0 pt-4">
                        {promotion.category1 ? promotion.category1.split(',').map((category, index) => (
                          <span key={index} className={styles.categoryContainer}>{category}</span>
                        )) : null}
                      </td>
                      <td className="border-0 pt-4">
                        <span>{promotion.starPrice.toLocaleString()}원</span>
                      </td>
                      <td className="border-0 pt-4">{new Date(promotion.regDate).toLocaleDateString()}</td>
                    </tr>
                    <tr key={`${promotion.starNo}-row2`}>
                      <td colSpan="4">
                        <div className={styles.buttonContainer}>
                          <button className={`${styles.btnReview} ${styles.statusPending}`} disabled>{promotion.status}</button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
          {visibleItems < userPromotionList.length && (
            <div className={styles.loadMoreBtn}>
              <button type="button" onClick={loadMore}>더보기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionForm;
