import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as starBoard from '../../apis/starBoard';

const List = ({ type, optionList, page, option }) => {
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
    navigate(`/page/board/${type}Board/${type}List?page=${page.page}&code=${code}&keyword=${keyword}`);
  };

  return (
    <div className="container" style={{ padding: '10px' }}>
      <h3 className="event">{type.toUpperCase()}</h3>
      <div className="eventtext">
        <label>다양한 이벤트에 참여하고 상품도 받아가세요🎊</label>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <select name="code">
            {optionList.map((item) => (
              <option key={item.code} value={item.code} selected={item.code === option.code}>
                {item.codeName}
              </option>
            ))}
          </select>
          <input type="text" name="keyword" placeholder="검색어를 입력하세요" defaultValue={option.keyword} />
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
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                  조회된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td align="center">{item.id}</td>
                  <td>
                    <Link to={`/${type}Post?starNo=${item.id}`}>{item.title} [{item.commentCount}]</Link>
                    {new Date(item.regDate) > new Date() && (
                      <img src="/img/new.png" alt="new" style={{ width: '15px', height: '15px' }} />
                    )}
                  </td>
                  <td align="center">{item.writer}</td>
                  <td align="center">
                    <span>{new Date(item.regDate).toLocaleString()}</span>
                  </td>
                  <td align="center">{item.likes}</td>
                  <td align="center">{item.views}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <Link to={`/page/board/${type}Board/${type}Insert`} className="btnn" style={{ backgroundColor: '#91ACCF' }}>✏글쓰기</Link>
      </div>
      <center>
        <div className="pagination">
          <Link to={`/page/board/${type}Board/${type}List?page=${page.first}&code=${option.code}&keyword=${option.keyword}`}>
            <span className="material-symbols-outlined">first_page</span>
          </Link>
          {page.page !== page.first && (
            <Link to={`/page/board/${type}Board/${type}List?page=${page.prev}&code=${option.code}&keyword=${option.keyword}`}>
              <span className="material-symbols-outlined">chevron_backward</span>
            </Link>
          )}
          {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map((no) => (
            <React.Fragment key={no}>
              {page.page === no ? (
                <b><span>{no}</span></b>
              ) : (
                <Link to={`/page/board/${type}Board/${type}List?page=${no}&code=${option.code}&keyword=${option.keyword}`} style={{ padding: '0 7px' }}>{no}</Link>
              )}
            </React.Fragment>
          ))}
          {page.page !== page.last && (
            <Link to={`/page/board/${type}Board/${type}List?page=${page.next}&code=${option.code}&keyword=${option.keyword}`} className="material-symbols-outlined">
              chevron_forward
            </Link>
          )}
          <Link to={`/page/board/${type}Board/${type}List?page=${page.last}&code=${option.code}&keyword=${option.keyword}`}>
            <span className="material-symbols-outlined">last_page</span>
          </Link>
        </div>
      </center>
    </div>
  );
}

export default List;
