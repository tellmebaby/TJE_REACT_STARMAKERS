import React, { useEffect, useState } from 'react';
import styles from './MyReviewListForm.module.css';
import * as mypage from '../../apis/mypage';
import { Link } from 'react-router-dom';
import Menu from './Menu';

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

  const handleAllDelete = async () => {
    const allStarNos = userReviewList.map(review => review.starNo);
    if (allStarNos.length === 0) {
      alert('삭제할 게시물이 없습니다.');
      return;
    }

    const confirmDelete = window.confirm('모든 게시물을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    console.log('Deleting all reviews:', allStarNos);

    try {
      await mypage.deleteReview(allStarNos);
      alert('모든 게시물이 삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting all reviews:', error);
    }
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const userReviewList = Array.isArray(reviewList) ? reviewList.filter(review => review.userNo === user.userNo) : [];

  return (
    <div className="container">
      <div className="row">
      <Menu styles={styles}/>
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
            <tbody>
              {userReviewList.length === 0 ? (
                <tr>
                  <td colSpan="4" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                    조회된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                userReviewList.map((review) => (
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
                ))
              )}
            </tbody>
          </table>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleDelete}>삭제</button>
            <button className={styles.button} onClick={handleAllDelete}>전체삭제</button>
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
