import React, { useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
    if (!location.state && selectedOptions.size === 0) {
      fetchData(true);
    }
  }, [location, selectedOptions.size]);

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
    if (selectedOptions.size > 0) {
      fetchData();
    }
  }, [selectedOptions, userInfo, page]);

  const fetchData = async () => {
    const params = {
      ...Object.fromEntries(selectedOptions),
      userNo: userInfo ? userInfo.userNo : 0,
      page
    };
    try {
      const response = await axios.get('/starList/api', { params });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputClick = (option, value = true) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = new Map(prevOptions);
      if (newOptions.has(option)) {
        newOptions.delete(option);
      } else {
        newOptions.set(option, value);
      }
      fetchData();  // 옵션 변경 후 데이터 다시 불러오기
      return newOptions;
    });
  };

  const isOptionSelected = (option) => {
    return selectedOptions.has(option);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      handleInputClick('keyword', searchKeyword);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    if (value === '') {
      handleInputClick('keyword', ' ');
    }
  };

  const clearSearch = () => {
    setSearchKeyword('');
    handleInputClick('keyword', ' ');
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
        {data.map((item) => (
          <div key={item.starNo} className='star-card-item' style={{ width: '170px' }}>
            <DangsmCard card={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScList;