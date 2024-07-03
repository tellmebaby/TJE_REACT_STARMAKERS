import React from 'react';
import styles from './MyReviewListForm.module.css';
import { Link } from 'react-router-dom';

const MyReviewListForm = ({ reviewList, user, page, setPage, setKeyword }) => {
  const handleDelete = () => {
    const checkboxes = document.querySelectorAll('input[name="reviewNo"]:checked');
    if (checkboxes.length === 0) {
      alert('하나 이상의 게시물을 선택하십시오.');
      return;
    }

    const confirmDelete = confirm('선택한 게시물을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    const reviewNos = Array.from(checkboxes).map(checkbox => checkbox.value);
    // Form action for deletion
  };

  const handleUpdate = () => {
    const checkboxes = document.querySelectorAll('input[name="reviewNo"]:checked');
    if (checkboxes.length === 0) {
      alert('하나의 게시물을 선택하십시오.');
      return;
    }

    if (checkboxes.length > 1) {
      alert('수정할 게시물 하나만 선택하십시오.');
      return;
    }
    const reviewNo = checkboxes[0].value;
    window.location.href = `/page/mypage/reviewUpdate?reviewNo=${reviewNo}`;
  };

  return (
    <div>
      <div className={styles.list}>
        <Link to="/page/mypage/promotion">
          <h2 style={{ color: '#545454' }} className={styles.juaRegular}>홍보글</h2>
        </Link>
        <Link to="/page/mypage/event">
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
          reviewList.map((reviewBoard) => (
            reviewBoard.userNo === user.userNo && (
              <tr key={reviewBoard.reviewNo}>
                <td><input type="checkbox" name="reviewNo" value={reviewBoard.reviewNo} /></td>
                <td>
                  <Link to={`/reviewPost?reviewNo=${reviewBoard.reviewNo}`}>{reviewBoard.title}</Link>
                </td>
                <td align="center">
                  <span>{new Date(reviewBoard.regDate).toLocaleString()}</span>
                </td>
                <td align="center">{reviewBoard.views}</td>
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
          <Link to={`/page/mypage/event?page=${page.first}&code=${option.code}&keyword=${option.keyword}`}>&laquo;</Link>
          {page.page !== page.first && (
            <Link to={`/page/mypage/event?page=${page.prev}&code=${option.code}&keyword=${option.keyword}`}>&lt;</Link>
          )}
          {Array.from({ length: page.end - page.start + 1 }, (_, i) => i + page.start).map(no => (
            page.page === no ? (
              <b key={no}>{no}</b>
            ) : (
              <Link key={no} to={`/page/mypage/event?page=${no}&code=${option.code}&keyword=${option.keyword}`}>{no}</Link>
            )
          ))}
          {page.page !== page.last && (
            <Link to={`/page/mypage/event?page=${page.next}&code=${option.code}&keyword=${option.keyword}`}>&gt;</Link>
          )}
          <Link to={`/page/mypage/event?page=${page.last}&code=${option.code}&keyword=${option.keyword}`}>&raquo;</Link>
        </div>
      </center>
    </div>
  );
};

export default MyReviewListForm;
