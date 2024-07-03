import React, { useEffect, useState } from 'react';
import styles from './MyReviewListForm.module.css';
import * as mypage from '../../apis/mypage';
import { Link } from 'react-router-dom';

const MyReviewListForm = ({ reviewList, setReviewList, user, page, setPage, setKeyword }) => {
  const [selectedStarNos, setSelectedStarNos] = useState([]);

  const handleCheckboxChange = (starNo) => {
    setSelectedStarNos((prevSelected) =>
      prevSelected.includes(starNo)
        ? prevSelected.filter((no) => no !== starNo)
        : [...prevSelected, starNo]
    );
  };

  useEffect(() => {
    console.log(reviewList);
    console.log(user);
}, [reviewList, user]);

  const handleDelete = async () => {
    if (selectedStarNos.length === 0) {
      alert('하나 이상의 게시물을 선택하십시오.');
      return;
    }

    const confirmDelete = window.confirm('선택한 게시물을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    console.log('Deleting reviews:', selectedStarNos);

    try {
      await mypage.deleteReview(selectedStarNos);
      alert('삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting reviews:', error);
    }
  };

  const handleUpdate = () => {
    if (selectedStarNos.length === 0) {
      alert('하나의 게시물을 선택하십시오.');
      return;
    }

    if (selectedStarNos.length > 1) {
      alert('수정할 게시물 하나만 선택하십시오.');
      return;
    }

    const starNo = selectedStarNos[0];
    window.location.href = `/update/${starNo}`;
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };

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
              <h2 style={{ color: '#545454' }} className={styles.juaRegular}>홍보글</h2>
            </Link>
            <Link to="/mypage/myReviewList">
              <h2 style={{ color: '#000' }} className={styles.juaRegular}>이벤트 후기</h2>
            </Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '10px' }}> </th>
                <th style={{ width: '500px' }}>제목</th>
                <th style={{ width: '200px' }}>작성일자</th>
                <th style={{ width: '100px' }}>조회수</th>
              </tr>
            </thead>
            {reviewList.length === 0 ? (
              <tr>
                <td colSpan="6" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              reviewList.map((review) => (
                review.userNo === user.userNo && (
                  <tr key={review.starNo}>
                    <td>
                      <input
                        type="checkbox"
                        name="starNo"
                        value={review.starNo}
                        onChange={() => handleCheckboxChange(review.starNo)}
                      />
                    </td>
                    <td>
                      <Link to={`/${review.starNo}`}>{review.title}</Link>
                    </td>
                    <td align="center">
                      <span>{new Date(review.regDate).toLocaleString()}</span>
                    </td>
                    <td align="center">{review.views}</td>
                  </tr>
                )
              ))
            )}
          </table>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleUpdate}>수정</button>
            <button className={styles.button} onClick={handleDelete}>삭제</button>
          </div>
          {/* 페이지네이션 */}
          <center>
            <div className={styles.pagination}>
              {/* [ 처음으로 ] */}
              <span className="material-symbols-outlined" onClick={() => handleClick(page.first)}>first_page</span>

              {/* [ 이전 ] */}
              {page.page !== page.first && (
                <span className="material-symbols-outlined" onClick={() => handleClick(page.prev)}>chevron_backward</span>
              )}

              {/* 페이지 번호 맵핑 */}
              {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map(no => (
                page.page === no ? (
                  <b key={no}><span>{no}</span></b>
                ) : (
                  <span key={no} onClick={() => handleClick(no)} style={{ padding: '0 7px' }}>{no}</span>
                )
              ))}

              {/* [ 다음 ] */}
              {page.page !== page.last && (
                <span className="material-symbols-outlined" onClick={() => handleClick(page.next)}>chevron_forward</span>
              )}

              {/* [ 마지막 ] */}
              <span className="material-symbols-outlined" onClick={() => handleClick(page.last)}>last_page</span>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default MyReviewListForm;
