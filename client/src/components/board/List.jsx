import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ optionList, starList, page, option }) => {
  return (
    <div className="container" style={{ padding: '10px' }}>
      <h3 className="event">EVENT</h3>
      <div className="eventtext">
        <label>다양한 이벤트에 참여하고 상품도 받아가세요🎊</label>
      </div>
      <div className="search-container">
        <form action="/page/board/eventBoard/eventList" method="get">
          <select name="code">
            {optionList.map((item) => (
              <option key={item.code} value={item.code} selected={item.code === option.code}>
                {item.codeName}
              </option>
            ))}
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={param.keyword} />
          <button type="submit">검색</button>
        </form>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '10px', display: 'flex', justifyContent: 'center', paddingBottom: '14px' }}>
        <table style={{ width: '97%' }}>
          <thead>
            <tr>
              <th width="70">번호</th>
              <th width="300">제목</th>
              <th width="150">작성자</th>
              <th width="200">작성일</th>
              <th width="150" style={{ fontSize: 'large' }}>★</th>
              <th width="100">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr className="fixed">
              <td align="center" className="important"><p className="important-text">필독</p></td>
              <td>
                <i className="fas fa-star"></i><b style={{ color: '#ff1919' }}>로그인 필수</b>
              </td>
              <td align="center">관리자</td>
              <td align="center">
                <span>2024-05-28 18:59:37</span>
              </td>
              <td align="center">537</td>
              <td align="center">678</td>
            </tr>
            <tr className="fixed">
              <td align="center" className="important"><p className="important-text">필독</p></td>
              <td>
                <i className="fas fa-star"></i><b style={{ color: '#ff2020' }}>질문 답변 등록 됩니다</b>
              </td>
              <td align="center">관리자</td>
              <td align="center">
                <span>2024-05-28 18:59:37</span>
              </td>
              <td align="center">596</td>
              <td align="center">439</td>
            </tr>

            {starList.length === 0 && (
              <tr>
                <td colSpan="6" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            )}

            {starList.map((starBoard) => (
              starBoard.type === 'event' && (
                <tr key={starBoard.starNo}>
                  <td align="center">{starBoard.starNo}</td>
                  <td>
                    <Link to={`/eventPost?starNo=${starBoard.starNo}`}>{starBoard.title} [{starBoard.commentCount}]</Link>
                    {new Date(starBoard.regDate) > new Date() && (
                      <img src="/img/new.png" alt="new" style={{ width: '15px', height: '15px' }} />
                    )}
                  </td>
                  <td align="center">{starBoard.writer}</td>
                  <td align="center">
                    <span>{new Date(starBoard.regDate).toLocaleString()}</span>
                  </td>
                  <td align="center">{starBoard.likes}</td>
                  <td align="center">{starBoard.views}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        {/* <!-- 비 로그인 시 --> */}
        {/* <th:block sec:authorize="isAnonymous()">
            
        </th:block>      */}
        {/* <!-- 로그인 시 --> */}
        {/* <th:block sec:authorize="hasRole('ROLE_ADMIN')"> */}
            <Link to="/page/board/eventBoard/eventInsert" className="btnn" style={{ backgroundColor: '#91ACCF' }}>✏글쓰기</Link>
        {/* </th:block> */}
      </div>

      {/* 페이지네이션 */}
      <center>
        <div className="pagination">
          {/* 처음으로 */}
          <Link to={`/page/board/eventBoard/eventList?page=${page.first}&code=${option.code}&keyword=${option.keyword}`}>
            <span className="material-symbols-outlined">first_page</span>
          </Link>

          {/* 이전 */}
          {page.page !== page.first && (
            <Link to={`/page/board/eventBoard/eventList?page=${page.prev}&code=${option.code}&keyword=${option.keyword}`}>
              <span className="material-symbols-outlined">chevron_backward</span>
            </Link>
          )}

          {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map((no) => (
            <React.Fragment key={no}>
              {page.page === no ? (
                <b><span>{no}</span></b>
              ) : (
                <Link to={`/page/board/eventBoard/eventList?page=${no}&code=${option.code}&keyword=${option.keyword}`} style={{ padding: '0 7px' }}>{no}</Link>
              )}
            </React.Fragment>
          ))}

          {/* 다음 */}
          {page.page !== page.last && (
            <Link to={`/page/board/eventBoard/eventList?page=${page.next}&code=${option.code}&keyword=${option.keyword}`} className="material-symbols-outlined">
              chevron_forward
            </Link>
          )}

          {/* 마지막 */}
          <Link to={`/page/board/eventBoard/eventList?page=${page.last}&code=${option.code}&keyword=${option.keyword}`}>
            <span className="material-symbols-outlined">last_page</span>
          </Link>
        </div>
      </center>
    </div>
  );
}

export default List;
