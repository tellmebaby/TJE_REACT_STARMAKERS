import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import StarCardList from './StarCardList';
import './css/ScList.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContextProvider';
import DangsmCard from '../../main/starcard/DangsmCard';

const ScList = ({category, option, keyword: initialKeyword}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword || '');
  const [data, setData] = useState([]);  // 데이터 상태 추가
  const [page, setPage] = useState(1);  // 페이지 상태 관리, 필요하다면
  const { isLogin, userInfo } = useContext(LoginContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);  // 추가 데이터 로딩 가능 여부


  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치와 뷰포트 높이가 전체 문서 높이에 근접했는지 확인
      console.log("접근했나봐 아래에 무한 스크로로~")
      if (window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100 && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (selectedOptions.size > 0 || page > 1) {
      console.log('셀렉트옵션이 0보다 크거나 페이지가 1보다 클때');
      fetchData();
    }
  }, [Array.from(selectedOptions).map(([key, val]) => `${key}:${val}`).join(','), userInfo, page]);

  //   useEffect(() => {
  //   if (!location.state && selectedOptions.size === 0) {
  //     console.log('로케이션 스테이트 !location.state && selectedOptions.size === 0');
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

  // useEffect(() => {
  //   if (selectedOptions.size > 0) {
  //     console.log('선택옵션이 하나 이상이라 부른다');
  //     fetchData();
  //   }
  // }, [selectedOptions, userInfo, page]);
// selectedOptions 상태가 바뀔 때마다 fetchData를 호출합니다.
useEffect(() => {
  fetchData();
}, [Array.from(selectedOptions).map(([key, val]) => `${key}:${val}`).join(','), page]);


// 선택된 옵션 변경에 따라 데이터를 새로 불러오고, 페이지를 1로 초기화
useEffect(() => {
  setPage(1);
  fetchData();
}, [Array.from(selectedOptions).map(([key, val]) => `${key}:${val}`).join(',')]);

// 페이지 번호가 변경될 때 추가 데이터를 불러옴
useEffect(() => {
  console.log('Page number changed');
  if (page > 1) fetchData();  // 추가 페이지 데이터를 불러옴
}, [page]);


const handleInputClick = (option, value = true) => {
  setSelectedOptions((prevOptions) => {
    const newOptions = new Map(prevOptions);
    if (newOptions.has(option)) {
      newOptions.delete(option);
    } else {
      newOptions.set(option, value);
    }
    // 페이지를 1로 리셋하고 데이터를 초기화하는 로직은 여기에 남겨둡니다.
    setPage(1);
    setData([]);
    setHasMore(true); // 옵션이 변경될 때 항상 hasMore를 true로 재설정
    return newOptions;
  });
};

const fetchData = async () => {
  if (!hasMore || loading || selectedOptions.size === 0) return;

  setLoading(true);
  const params = { ...Object.fromEntries(selectedOptions), userNo: userInfo ? userInfo.userNo : 0, page };

  try {
    const response = await axios.get('/starList/api', { params });
    const newData = response.data || [];
    setData(prevData => page === 1 ? newData : [...prevData, ...newData]);
    setHasMore(newData.length === 24);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};
    // Using useMemo to avoid recalculating on each render
    const isOptionSelected = useMemo(() => {
      
      console.log('isOptionSelected : ' , selectedOptions );
      return option => selectedOptions.has(option);
    }, [selectedOptions]);

    useEffect(() => {
      const keywordFromSearch = location.state?.keyword;
      if (keywordFromSearch) {
        // 검색어를 selectedOptions에 추가
        setSelectedOptions(prev => new Map(prev).set('keyword', keywordFromSearch));
      }
    }, [location.state]);
    
    useEffect(() => {
      if (selectedOptions.size > 0) {
        fetchData();
      }
    }, [selectedOptions, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      handleInputClick('keyword', searchKeyword);
    }
  };

  const handleSearchChange = (e) => {
    const newSearchKeyword = e.target.value;
    setSearchKeyword(newSearchKeyword);
    if (newSearchKeyword === '') {
      setSelectedOptions(new Map()); // Clear all options to fetch all data
      setPage(1); // Reset to the first page
      fetchData(); // Immediately fetch all data
    }
  };




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
          <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-bar_input"
            id="searchInput"
            placeholder="검색"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </form>
          </div>
        {/* <div className="sub-btn-calendar">
          <a href="/page/starCard/starCalendar" className="btn-starCalendar">
            <i className="bi bi-calendar-week"></i>
          </a>
        </div> */}
        <div>
        {!isLogin ? null : (
          <div className="sub-btn-insertCard">
            <Link to="/starInsert" className="btn-starInsert">
              <i className="bi bi-pen"></i>
            </Link>
          </div>
        )}
        </div>
      </div>
      <div className="container-typeTitle">
        <span className="typeTileText"></span>
      </div>


      <div className='star-card-list'>
        {data.map((item, index) => (
          <div key={item.starNo || index} className='star-card-item' style={{ width: '170px' }}>
            <DangsmCard card={item} />
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ScList;