import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../board/css/list.module.css'

const List = ({ type, optionList, page, option, boardList, setPage, setCode, setKeyword, isLoading}) => {

  const keywordRef = useRef();

  console.log("boardList", boardList);

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  }

  const handleSearch = (e) =>{
    e.preventDefault();
    setKeyword(keywordRef.current.value);
  }

  const getTitle = () => {
    switch (type) {
      case 'event': return 'EVENT';
      case 'an': return 'Notice';
      case 'review': return '후기';
    }
  };

  const getStyle = () => {
    switch (type) {
      case 'event': return 'event';
      case 'an': return 'notice';
      case 'review': return 'review';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'event': return '다양한 이벤트에 참여하고 상품도 받아가세요🎊';
      case 'an': return '📢운영수칙을 준수하여 활동에 피해가 없도록 하시길 바랍니다;';
      case 'review': return '참여하신 이벤트나 홍보 후기를 자유롭게 남겨주세요 :D';
      default: return '';
    }
  };

  

  return (
  // <div className="container" style={{backgroundColor: '#f5f5f5'}}>
    <div className="container" style={{ padding: 'auto' }}>
      <h3 className={styles.{getStyle()}}>{getTitle()}</h3>
      <div className={styles.eventtext}>
        <label>{getDescription()}</label>
      </div>
      <div className={styles['search-container']}>
        <form action={`/${type}`} method="get">
          <select name="code" className={styles.select} onChange={handleCodeChange}>
            {optionList.map((option) => (
              <option key={option.code} value={option.code}>
                {option.codeName}
              </option>
            ))}
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={option.keyword} ref={keywordRef}/>
          <button type="submit" className={styles.button} onClick={handleSearch}>검색</button>
        </form>
      </div>
      <div style={{backgroundColor: 'white',  borderRadius: '10px', display: 'flex',  justifyContent: 'center', paddingBottom: '14px' }}>
        <table style={{width: '97%'}}>
          <thead>
            <tr>
              <th width="70">번호</th>
              <th width="300">제목</th>
              <th width="150">작성자</th>
              <th width="200">작성일</th>
              <th width="150" className={styles.star}>★</th>
              <th width="100">조회수</th>
            </tr>
          </thead>
          
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
            {isLoading && boardList.length === 0 ? (
              <tr>
                <td colSpan="6" align="center" className={styles.emptyRow} style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boardList.map((starBoard) => (
                <tr key={starBoard.starNo}>
                  <td align="center">{starBoard.starNo}</td>
                  <td>
                    <Link to={`/${starBoard.starNo}`} className={styles.link}>{starBoard.title} [{starBoard.commentCount}]</Link>
                    {new Date(starBoard.regDate) > new Date() && (
                      <img src="/img/new.png" alt="new" className={styles.newIcon} />
                    )}
                  </td>
                  <td align="center">{starBoard.writer}</td>
                  <td align="center">
                    <span>{new Date(starBoard.regDate).toLocaleString()}</span>
                  </td>
                  <td align="center">{starBoard.likes}</td>
                  <td align="center">{starBoard.views}</td>
                </tr>
              ))
            )}
          
        </table>
      </div>
      <div className={styles['button-container']}>
        <Link to={`/${type}Insert` } className={styles.btnn} style={{ backgroundColor: '#91ACCF' }}>✏글쓰기</Link>
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
    // </div>
  );
  
}

export default List;
