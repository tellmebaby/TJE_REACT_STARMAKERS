import React, { useEffect, useState } from 'react';
import StarCardList from './StarCardList';
import './css/ScList.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const ScList = ({option}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState('');


  useEffect(() => {
    if (option) {
      setSelectedOptions(new Map([[option, true]]));
    }
  }, [option]);

  const handleInputClick = (option, value = true) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = new Map(prevOptions);
      if (newOptions.has(option)) {
        newOptions.delete(option);
      } else {
        newOptions.set(option, value);
      }
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
        <div className="sub-btn-calendar">
          <a href="/page/starCard/starCalendar" className="btn-starCalendar">
            <i className="bi bi-calendar-week"></i>
          </a>
        </div>
        {/* 비로그인시 */}
        <div>
          {/* 비로그인시 표시될 내용 */}
        </div>
        {/* 로그인시 */}
        <div>
          <div className="sub-btn-insertCard">
            <Link to="/starInsert" className="btn-starInsert">
              <i className="bi bi-pen"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-typeTitle">
        <span className="typeTileText"></span>
      </div>


      <StarCardList options={selectedOptions} />
    </div>
  );
};

export default ScList;