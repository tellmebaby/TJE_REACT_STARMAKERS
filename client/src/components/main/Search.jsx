import React, { useEffect, useRef, useState } from 'react';
import './css/Search.css';
import { Link, useNavigate } from 'react-router-dom';
import CategoryButton from './category/CategoryButton';

const categoryDetails = {
  music: { image: '/img/categoryMusic.gif', label: 'MUSIC' },
  travel: { image: '/img/categoryTravle.gif', label: 'TRAVEL' },
  food: { image: '/img/categoryFood2.gif', label: 'FOOD' },
  game: { image: '/img/categoryGame.gif', label: 'GAME' },
  animal: { image: '/img/categoryAnimal.gif', label: 'ANIMAL' },
  workOut: { image: '/img/categoryGym.gif', label: 'WORKOUT' },
  fashion: { image: '/img/categoryFashion.gif', label: 'FASHION' },
  asmr: { image: '/img/categoryAsmr.gif', label: 'ASMR' },
};

const Search = () => {
  const bgImageRef = useRef(null);
  const [bgImage, setBgImage] = useState('/img/indexTopBackImg.jpg');
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxSpeed = 1.08;
      if (bgImageRef.current) {
        bgImageRef.current.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate('/starList', { state: { keyword: searchKeyword } });
    } else {
      // 검색어가 없을 경우 경고
      alert("검색어를 입력해주세요.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleMouseOver = (image) => {
    setBgImage(image);
  };

  return (
    <div className="container">
      <div className="jumbotron text-center bg-image" ref={bgImageRef} style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="topOverlay d-flex flex-column align-items-center">
          <div className='jumbo-top-margin'></div>
          <h1 className="display-4">스타가 되는 첫걸음</h1>
          <p className="lead">스타가 되고 싶은 당신을 위한 홍보 플랫폼</p>
          <div className="d-flex">
            <Link to="/starInsert" className="btn btn-primary btn-lg me-3">무료로 참여하기</Link>
            <Link to="/starList" className='btn btn-secondary btn-lg'>스타 보러가기</Link>
          </div>
          <div className="row mb-3 mt-3">
            <div className="col-md-12 d-flex align-items-center">
              <input 
                  type="text" 
                  className="form-control me-2" 
                  id="main-search" 
                  placeholder="검색 키워드 입력" 
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" id="btn-mainSearch" onClick={handleSearchSubmit}>검색</button>
            </div>
          </div>
          <div className='Search-Btn-CategoryCon'>
            <div className='Search-Btn-CategoryArt'>
                {Object.entries(categoryDetails).map(([key, details]) => (
                    <CategoryButton 
                        key={key}
                        category={key}
                        label={details.label}
                        handleMouseOver={() => setBgImage(details.image)}
                        handleMouseOut={() => setBgImage('/img/indexTopBackImg.jpg')}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;