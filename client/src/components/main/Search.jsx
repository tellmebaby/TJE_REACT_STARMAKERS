import React, { useEffect, useRef, useState } from 'react';
import './css/Search.css';

const Search = () => {
  const bgImageRef = useRef(null);
  const [bgImage, setBgImage] = useState('../../../../public/img/indexTopBackImg.jpg');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxSpeed = 1.08;
      if (bgImageRef.current) {
        bgImageRef.current.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseOverMu = () => {
    setBgImage('/img/categoryMusic.gif');
  };
  const handleMouseOverTr = () => {
    setBgImage('/img/categoryTravle.gif');
  };
  const handleMouseOverFd = () => {
    setBgImage('/img/categoryFood2.gif');
  };
  const handleMouseOverGm = () => {
    setBgImage('/img/categoryGame.gif');
  };
  const handleMouseOverAm = () => {
    setBgImage('/img/categoryAnimal.gif');
  };
  const handleMouseOverWo = () => {
    setBgImage('/img/categoryGym.gif');
  };
  const handleMouseOverFs = () => {
    setBgImage('/img/categoryFashion.gif');
  };
  const handleMouseOverAs = () => {
    setBgImage('/img/categoryAsmr.gif');
  };

  const handleMouseOut = () => {
    setBgImage('/img/indexTopBackImg.jpg');
  };

  return (
    <div className="container">
      <div
        className="jumbotron text-center bg-image"
        ref={bgImageRef}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="topOverlay d-flex flex-column align-items-center">
          <div className='jumbo-top-margin'></div>
          <h1 className="display-4">스타가 되는 첫걸음</h1>
          <p className="lead">스타가 되고 싶은 당신을 위한 홍보 플랫폼</p>
          <div className="d-flex">
            <a href="page/starCard/starInsert" className="btn btn-primary btn-lg me-3">무료로 참여하기</a>
            <a href="page/starCard/starList" className="btn btn-secondary btn-lg">스타 보러가기</a>
          </div>
          <div className="row mb-3 mt-3">
            <div className="col-md-12 d-flex align-items-center">
              <input type="text" className="form-control me-2" id="main-search" placeholder="검색 키워드 입력" />
              <button className="btn btn-primary" id="btn-mainSearch">검색</button>
            </div>
          </div>
          <div className='Search-Btn-CategoryCon'>
            <div className='Search-Btn-CategoryArt'>
              <div className='atr' onMouseOver={handleMouseOverMu} onMouseOut={handleMouseOut}>MUSIC</div>
              <div className='atr' onMouseOver={handleMouseOverTr} onMouseOut={handleMouseOut}>TRAVEL</div>
              <div className='atr' onMouseOver={handleMouseOverFd} onMouseOut={handleMouseOut}>FOOD</div>
              <div className='atr' onMouseOver={handleMouseOverGm} onMouseOut={handleMouseOut}>GAME</div>
              <div className='atr' onMouseOver={handleMouseOverAm} onMouseOut={handleMouseOut}>ANIMAL</div>
              <div className='atr' onMouseOver={handleMouseOverWo} onMouseOut={handleMouseOut}>WORKOUT</div>
              <div className='atr' onMouseOver={handleMouseOverFs} onMouseOut={handleMouseOut}>FASHION</div>
              <div className='atr' onMouseOver={handleMouseOverAs} onMouseOut={handleMouseOut}>ASMR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;