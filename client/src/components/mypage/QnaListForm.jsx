import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as mypage from '../../apis/mypage';
import styles from '../mypage/css/QnaListForm.module.css';
import { formatDate } from '../../apis/format';
import Menu from './Menu';

const QnaListForm = ({ qnaList, user, page, setPage, setCode }) => {
  const [selectedQnaNos, setSelectedQnaNos] = useState([]);

  // useEffect(() => {
  //   console.log('QnaListForm qnaList:', qnaList);
  //   console.log('QnaListForm user:', user);
  // }, [qnaList, user]);

  const handleCheckboxChange = (qnaNo) => {
    setSelectedQnaNos((prevSelected) =>
      prevSelected.includes(qnaNo)
        ? prevSelected.filter((no) => no !== qnaNo)
        : [...prevSelected, qnaNo]
    );
  };

  const handleDelete = async () => {
    if (selectedQnaNos.length === 0) {
      alert('하나 이상의 게시물을 선택하십시오.');
      return;
    }

    const confirmDelete = window.confirm('선택한 게시물을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    try {
      await mypage.deleteQna(selectedQnaNos);
      alert('삭제되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting qna:', error);
    }
  };

  const handleAllDelete = async () => {
    const allQnaNos = userQnaList.map(qna => qna.qnaNo);
    if (allQnaNos.length === 0) {
      alert('삭제할 게시물이 없습니다.');
      return;
    }

    const confirmDelete = window.confirm('모든 게시물을 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    try {
      await mypage.deleteQna(allQnaNos);
      alert('모든 게시물이 삭제되었습니다');
      window.location.reload();
    } catch (error) {
      console.error('qna 전체삭제 에러' + error);
    }
  };

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const userQnaList = Array.isArray(qnaList) ? qnaList.filter(qna => qna.userNo === user.userNo) : [];

  return (
    <div className="container">
      <div className="row">
      <Menu styles={styles}/>
        <div className="col-md-9">
          <div className={styles.list}>
            <h2 className={styles.juaRegular}>1 : 1 문의</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '10px' }}></th>
                <th style={{ width: '600px' }}>제목</th>
                <th style={{ width: '240px' }}>작성일자</th>
                <th style={{ width: '90px' }}>상태</th>
              </tr>
            </thead>
            {userQnaList.length === 0 ? (
              <tr>
                <td colSpan="6" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              <tbody>
                {userQnaList.map((qna) => (
                  <tr key={qna.qnaNo}>
                    <td>
                      <input
                        type="checkbox"
                        name="qnaNo"
                        value={qna.qnaNo}
                        onChange={() => handleCheckboxChange(qna.qnaNo)}
                      />
                    </td>
                    <td align="center">
                      <Link to={`/qna/qnaRead/${qna.qnaNo}`}>
                        {qna.title}
                      </Link>
                    </td>
                    <td align="center">
                      <span>{formatDate(qna.regDate)}</span>
                    </td>
                    <td align="center" className={qna.status === '답변 대기' ? styles.statusWaiting : styles.statusCompleted}>
                      {qna.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleDelete}>삭제</button>
            <button className={styles.button} onClick={handleAllDelete}>전체삭제</button>
          </div>
          {/* 페이지네이션 */}
          <center>
            <div className={styles.pagination}>
              {/* [ 처음으로 ] */}
              <span className="material-symbols-outlined" onClick={() => handleClick(page.first)} >first_page</span>

              {/* [ 이전 ] */}
              {page.page !== page.first && (
                <span className="material-symbols-outlined" onClick={() => handleClick(page.prev)} >chevron_backward</span>
              )}

              {/* 페이지 번호 맵핑 */}
              {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map(no => (
                page.page === no ? (
                  <b key={no}><span>{no}</span></b>
                ) : (
                  <span onClick={() => handleClick(no)} style={{ padding: '0 7px' }}>{no}</span>
                )
              ))}

              {/* [ 다음 ] */}
              {page.page !== page.last && (
                <span className="material-symbols-outlined" onClick={() => handleClick(page.next)} >chevron_forward</span>
              )}

              {/* [ 마지막 ] */}
              <span className="material-symbols-outlined" onClick={() => handleClick(page.last)} >last_page</span>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default QnaListForm;
