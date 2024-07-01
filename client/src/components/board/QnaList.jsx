import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../board/css/list.module.css';

const QnaList = ({ qnaList, isLoading, optionList, page, option, onPageChange }) => {
  console.log(qnaList);

  const handleClick = (event, pageNumber) => {
    // event.preventDefault();
    onPageChange(pageNumber);
  };

  return (
    <div className="container">
      <h3 className={styles.notice}>Q&A</h3>
      <div className={styles.eventtext}>
        <label>당스만을 이용하면서 궁금한 점을 자유롭게 문의하세요:)</label>
      </div>
      <div className={styles['search-container']}>
        <form action="/qna/qnaList" method="get">
          <select name="code" defaultValue={option.code}>
            {optionList.map((option) => (
              <option key={option.code} value={option.code}>
                {option.codeName}
              </option>
            ))}
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={option.keyword} />
          <button type="submit" className={styles.button}>검색</button>
        </form>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', display: 'flex', justifyContent: 'center', paddingBottom: '14px' }}>
        <table style={{ width: '97%' }}>
          <thead>
            <tr>
              <td width="70"></td>
              <th width="300">제목</th>
              <th width="150">작성자</th>
              <th width="200">작성일</th>
              <th width="150">상태</th>
              <th width="100">조회수</th>
            </tr>
          </thead>
          <tbody>
          <tr className={styles.fixed}>
              <td align="center"><i className="fa-solid fa-q twinkle"></i></td>
              <td><i className="fas fa-star"></i><b style={{ color: 'crimson' }}>로그인 필수</b></td>
              <td align="center">관리자</td>
              <td align="center"><span>2024-05-28 18:59:37</span></td>
              <td align="center"></td>
              <td align="center">678</td>
            </tr>
            <tr className={styles.fixed}>
              <td align="center"><i className="fa-solid fa-q twinkle"></i></td>
              <td><i className="fas fa-star"></i><b style={{ color: 'crimson' }}>관리 원칙에 위배되는 글은 삭제될 수 있습니다.</b></td>
              <td align="center">관리자</td>
              <td align="center"><span>2024-05-28 18:40:37</span></td>
              <td align="center"></td>
              <td align="center">439</td>
            </tr>
            {isLoading ? (
              <tr>
                <td colSpan="6" align="center">Loading...</td>
              </tr>
            ) : (
              qnaList.length === 0 ? (
                <tr>
                  <td colSpan="6" align="center" className={styles.emptyRow} style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                    조회된 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                qnaList.map((qnaBoard) => (
                  <tr key={qnaBoard.qnaNo}>
                    <td align="center"><i className="fa-solid fa-q twinkle"></i></td>
                    <td>
                      <Link to={`/qnaPost?qnaNo=${qnaBoard.qnaNo}`}>{qnaBoard.title}</Link>
                      {new Date(qnaBoard.regDate) > new Date() && <img src="/img/new.png" style={{ width: '15px', height: '15px' }} />}
                    </td>
                    <td align="center">{qnaBoard.writer}</td>
                    <td align="center"><span>{new Date(qnaBoard.regDate).toLocaleString()}</span></td>
                    <td align="center" className={qnaBoard.status === '답변 대기' ? styles.statusWaiting : styles.statusCompleted}>{qnaBoard.status}</td>
                    <td align="center">{qnaBoard.views}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
      <div className={styles['button-container']}>
        {/* 비 로그인 시 */}
        {/* 여기에는 아무것도 표시되지 않음 */}

        {/* 로그인 시 */}
        {/* <a href="/page/board/qnaBoard/qnaInsert" className={`${styles.btnn}`} style={{ backgroundColor: '#91ACCF' }}>✏글쓰기</a> */}
      </div>

      {/* 페이지네이션 */}
      <center>
        <div className={styles.pagination}>
          {/* [ 처음으로 ] */}
          <Link to={`/qna/qnaList?page=${page.first}&code=${option.code}&keyword=${option.keyword}`} onClick={() => handleClick(page.first)}>
            <span className="material-symbols-outlined">first_page</span>
          </Link>

          {/* [ 이전 ] */}
          {page.page !== page.first && (
            <Link to={`/qna/qnaList?page=${page.prev}&code=${option.code}&keyword=${option.keyword}`} onClick={() => handleClick(page.prev)}>
              <span className="material-symbols-outlined">chevron_backward</span>
            </Link>
          )}

          {/* 페이지 번호 맵핑 */}
          {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map(no => (
            page.page === no ? (
              <b key={no}><span>{no}</span></b>
            ) : (
              <Link key={no} to={`/qna/qnaList?page=${no}&code=${option.code}&keyword=${option.keyword}`} onClick={() => handleClick(no)} style={{ padding: '0 7px' }}>{no}</Link>
            )
          ))}

          {/* [ 다음 ] */}
          {page.page !== page.last && (
            <Link to={`/qna/qnaList?page=${page.next}&code=${option.code}&keyword=${option.keyword}`} onClick={() => handleClick(page.next)}>
              <span className="material-symbols-outlined">chevron_forward</span>
            </Link>
          )}

          {/* [ 마지막 ] */}
          <Link to={`/qna/qnaList?page=${page.last}&code=${option.code}&keyword=${option.keyword}`} onClick={() => handleClick(page.last)}>
            <span className="material-symbols-outlined">last_page</span>
          </Link>
        </div>
      </center>
    </div>
  );
};

export default QnaList;
