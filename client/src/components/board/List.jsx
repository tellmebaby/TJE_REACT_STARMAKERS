import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as starBoard from '../../apis/starBoard';
import styles from '../board/css/list.module.css'

const List = ({ type, optionList, page, option, toBoard }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    starBoard.list(type, page.page, option).then(response => {
      setItems(response.data);
      setLoading(false);
    }).catch(error => {
      console.error(`Error fetching ${type} list:`, error);
      setLoading(false);
    });
  }, [type, page.page, option]);

  const handleSearch = (event) => {
    event.preventDefault();
    const code = event.target.code.value;
    const keyword = event.target.keyword.value;
    navigate(`/${type}?page=${page.page}&code=${code}&keyword=${keyword}`);
  };

  const getTitle = () => {
    switch (type) {
      case 'event': return 'EVENT';
      case 'an': return 'Notice';
      case 'review': return '후기';
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
    <div className="container" style={{ padding: '10px' }}>
      <h3 className={styles.event}>{getTitle()}</h3>
      <div className={styles.eventtext}>
        <label>{getDescription()}</label>
      </div>
      <div className={styles['search-container']}>
        <form onSubmit={handleSearch}>
          <select name="code" className={styles.select}>
            {optionList.map((option) => (
              <option key={option.code} value={option.code} selected={option.code === option.code}>
                {option.codeName}
              </option>
            ))}
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={option.keyword} className={styles.input} />
          <button type="submit" className={styles.button}>검색</button>
        </form>
      </div>
      <div className={styles['table-container']}>
        <table className={styles.table}>
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
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" align="center" className={styles.emptyRow}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((starBoard) => (
                <tr key={starBoard.id}>
                  <td align="center">{starBoard.type}</td>
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
          </tbody>
        </table>
      </div>
      <div className={styles['button-container']}>
        <Link to={toBoard} className={styles.btnn} style={{ backgroundColor: '#91ACCF' }}>✏글쓰기</Link>
      </div>
      <center>
        <div className={styles.pagination}>
          <Link to={`/${type}?page=${page.first}&code=${option.code}&keyword=${option.keyword}`} className={styles.pageLink}>
            <span className={styles.icon}>first_page</span>
          </Link>
          {page.page !== page.first && (
            <Link to={`/${type}?page=${page.prev}&code=${option.code}&keyword=${option.keyword}`} className={styles.pageLink}>
              <span className={styles.icon}>chevron_backward</span>
            </Link>
          )}
          {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map((no) => (
            <React.Fragment key={no}>
              {page.page === no ? (
                <b><span className={styles.currentPage}>{no}</span></b>
              ) : (
                <Link to={`/${type}?page=${no}&code=${option.code}&keyword=${option.keyword}`} className={styles.pageLink}>{no}</Link>
              )}
            </React.Fragment>
          ))}
          {page.page !== page.last && (
            <Link to={`/${type}?page=${page.next}&code=${option.code}&keyword=${option.keyword}`} className={styles.pageLink}>
              <span className={styles.icon}>chevron_forward</span>
            </Link>
          )}
          <Link to={`/${type}?page=${page.last}&code=${option.code}&keyword=${option.keyword}`} className={styles.pageLink}>
            <span className={styles.icon}>last_page</span>
          </Link>
        </div>
      </center>
    </div>
  );
  
}

export default List;
