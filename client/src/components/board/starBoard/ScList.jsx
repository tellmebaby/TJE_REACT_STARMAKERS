import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarCardList from './StarCardList';
import './css/ScList.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TypeSub from './TypeSub';

const ScList = () => {
  const [selectedOptions, setSelectedOptions] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState('');

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
          <TypeSub
            option="eventOngoing"
            label="진행"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="eventExpired"
            label="종료"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="eventUpcoming"
            label="예정"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
        </div>
        <div className="items-category1">
          <TypeSub
            option="instagram"
            label=""
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
            icon={<i className="bi bi-instagram"></i>}
          />
          <TypeSub
            option="youtube"
            label=""
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
            icon={<i className="bi bi-youtube"></i>}
          />
          <TypeSub
            option="chzzk"
            label={<img src="/img/icon/chzzkLight_logo.gif" alt="치지지로고" />}
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="afreeca"
            label={<img src="/img/icon/afreeca_logo.svg" alt="아프리카로고" />}
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
        </div>
        <div className="items-category2">
          <TypeSub
            option="food"
            label="음식"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="travel"
            label="여행"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="game"
            label="게임"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="music"
            label="음악"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="animal"
            label="동물"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="workOut"
            label="운동"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="asmr"
            label="ASMR"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
          <TypeSub
            option="fashion"
            label="패션"
            handleInputClick={handleInputClick}
            isOptionSelected={isOptionSelected}
          />
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