import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/ScList.css';
import './css/StarCardList.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import DangsmCard from '../../main/starcard/DangsmCard';
import TypeSub from './TypeSub';

const ScList = ({category, option, keyword: initialKeyword}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword || '');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isLogin, userInfo } = useContext(LoginContext);
  const location = useLocation();

  // useEffect(() => {
  //   if (!location.state && selectedOptions.size === 0) {
  //     fetchData(true);
  //   }
  // }, [location, selectedOptions.size]);

  useEffect(() => {
    const newOptions = new Map();
    if (category) newOptions.set(category, true);
    if (option) newOptions.set(option, true);
    if (initialKeyword) newOptions.set('keyword', initialKeyword);
    setSelectedOptions(newOptions);
  }, [category, option, initialKeyword]);

  useEffect(() => {
    const keyword = location.state?.keyword || '';
    setSearchKeyword(keyword);
    if (keyword) {
      setSelectedOptions(new Map([['keyword', keyword]]));
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // useEffect(() => {
  //   if (selectedOptions.size > 0 && hasMore) {
  //     fetchData();
  //   }
  // }, [selectedOptions, userInfo, page, searchKeyword]);

  const fetchData = async () => {
    if (!hasMore || loading) return;  // 추가적인 데이터 로딩 방지 및 중복 요청 방지
    setLoading(true);  // 데이터 로딩 시작
    const params = {
      ...Object.fromEntries(selectedOptions),
      userNo: userInfo ? userInfo.userNo : 0,
      page
    };
  
    try {
      const response = await axios.get('/starList/api', { params });
      if (response.data.length > 0) {
        setData(prevData => [...prevData, ...response.data]);
        setPage(prevPage => prevPage + 1);  // 페이지 번호 증가
        setHasMore(response.data.length === 24);  // 데이터 개수가 한 페이지당 최대 개수와 동일하면 더 불러올 데이터가 있음을 가정
      } else {
        setHasMore(false);  // 더 이상 불러올 데이터가 없음
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        console.error("API not found, check the URL or server configuration.");  // API 경로가 잘못되었을 때 추가적인 에러 로깅
      }
    } finally {
      setLoading(false); 
    }
  };

  // useEffect(() => {
  //   if (selectedOptions.size > 0) {
  //     fetchData();
  //   } else {
  //     setData([]);  
  //   }
  // }, [selectedOptions]); 
  
  const handleInputClick = (option, value = true) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = new Map(prevOptions);
      if (newOptions.has(option)) {
        newOptions.delete(option);
        console.log(`'${option}' 체크가 해제되었습니다.`);
      } else {
        newOptions.set(option, value);
        console.log(`'${option}' 체크되었습니다.`, Array.from(newOptions.entries()));  // 체크된 옵션 로그 출력
      }
  
      // if (newOptions.size === 0) {
      //   console.log("모든 체크가 해제되었습니다. 데이터를 비웁니다.");
      //   setData([]);
      // } else {
      //   fetchData(newOptions); 
      // }
      return newOptions;
    });
  };



  const isOptionSelected = option => selectedOptions.has(option);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSelectedOptions(prev => new Map(prev).set('keyword', searchKeyword));
  };

  const handleSearchChange = e => {
    setSearchKeyword(e.target.value);
  };

  // const clearSearch = () => {
  //   setSearchKeyword('');
  //   setSelectedOptions(new Map());
  // };




  return (
    <div>
      <div className="starList-detail">
        <div className="items-eventType">
          <div
            className="type-sub"
            onClick={() => handleInputClick('eventOngoing')}
            style={{
              border: isOptionSelected('eventOngoing') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="eventOngoing" checked={isOptionSelected('eventOngoing')} readOnly />
            <label htmlFor="eventOngoing">진행</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('eventExpired')}
            style={{
              border: isOptionSelected('eventExpired') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="eventExpired" checked={isOptionSelected('eventExpired')} readOnly />
            <label htmlFor="eventExpired">종료</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('eventUpcoming')}
            style={{
              border: isOptionSelected('eventUpcoming') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="eventUpcoming" checked={isOptionSelected('eventUpcoming')} readOnly />
            <label htmlFor="eventUpcoming">예정</label>
          </div>
        </div>
        <div className="items-category1">
          <div
            className="type-sub"
            onClick={() => handleInputClick('instagram')}
            style={{
              border: isOptionSelected('instagram') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="instagram" checked={isOptionSelected('instagram')} readOnly />
            <i className="bi bi-instagram"></i>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('youtube')}
            style={{
              border: isOptionSelected('youtube') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="youtube" checked={isOptionSelected('youtube')} readOnly />
            <i className="bi bi-youtube"></i>
          </div>
          <div
            className="type-sub"
            id="type-chzzk"
            onClick={() => handleInputClick('chzzk')}
            style={{
              border: isOptionSelected('chzzk') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="chzzk" checked={isOptionSelected('chzzk')} readOnly />
            <img src="/img/icon/chzzkLight_logo.gif" alt="치지지로고" />
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('afreeca')}
            style={{
              border: isOptionSelected('afreeca') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="afreeca" checked={isOptionSelected('afreeca')} readOnly />
            <img src="/img/icon/afreeca_logo.svg" alt="아프리카로고" />
          </div>
        </div>
        <div className="items-category2">
          <div
            className="type-sub"
            onClick={() => handleInputClick('food')}
            style={{
              border: isOptionSelected('food') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="food" checked={isOptionSelected('food')} readOnly />
            <label htmlFor="food">음식</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('travel')}
            style={{
              border: isOptionSelected('travel') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="travel" checked={isOptionSelected('travel')} readOnly />
            <label htmlFor="travel">여행</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('game')}
            style={{
              border: isOptionSelected('game') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="game" checked={isOptionSelected('game')} readOnly />
            <label htmlFor="game">게임</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('music')}
            style={{
              border: isOptionSelected('music') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="music" checked={isOptionSelected('music')} readOnly />
            <label htmlFor="music">음악</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('animal')}
            style={{
              border: isOptionSelected('animal') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="animal" checked={isOptionSelected('animal')} readOnly />
            <label htmlFor="animal">동물</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('workOut')}
            style={{
              border: isOptionSelected('workOut') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="workOut" checked={isOptionSelected('workOut')} readOnly />
            <label htmlFor="workOut">운동</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('asmr')}
            style={{
              border: isOptionSelected('asmr') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="asmr" checked={isOptionSelected('asmr')} readOnly />
            <label htmlFor="asmr">ASMR</label>
          </div>
          <div
            className="type-sub"
            onClick={() => handleInputClick('fashion')}
            style={{
              border: isOptionSelected('fashion') ? '3px solid green' : 'none',
            }}
          >
            <input className="hide-check" type="checkbox" id="fashion" checked={isOptionSelected('fashion')} readOnly />
            <label htmlFor="fashion">패션</label>
          </div>
        </div>
      </div>
  
      <div className="container-starSearch">
        <div className="sub-searchInput">
          <i id="icon-inSearchBar" className="bi bi-search"></i>
          <form id="searchForm" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-bar_input"
              id="searchInput"
              placeholder="검색"
              value={searchKeyword}
              onChange={handleSearchChange}
              onFocus={() => setSearchKeyword('')}
            />
          </form>
        </div>
        {!isLogin ? null : (
          <div className="sub-btn-insertCard">
            <Link to="/starInsert" className="btn-starInsert">
              <i className="bi bi-pen"></i>
            </Link>
          </div>
        )}
      </div>
      <div className="container-typeTitle">
        <span className="typeTileText"></span>
      </div>
  
      <div className='star-card-list'>
        {data.map((item) => (
          <div key={item.starNo} className='star-card-item' style={{ width: '170px' }}>
            <DangsmCard card={item} />
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ScList;