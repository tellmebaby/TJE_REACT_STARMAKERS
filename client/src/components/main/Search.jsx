import React from 'react';
import './Search.css';  // 같은 폴더에 있는 CSS 파일을 import

const Search = () => {
  return (
    <div className="container">
    <div className="jumbotron text-center bg-image">
        <div className="topOverlay d-flex flex-column align-items-center">
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
        </div>
    </div>
</div>
  )
}

export default Search