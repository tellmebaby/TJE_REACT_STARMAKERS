import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
        <Header />
        <div className="container">
            <div class="jumbotron text-center bg-image">
              <div class="topOverlay d-flex flex-column align-items-center">
                  <h1 class="display-4">스타가 되는 첫걸음</h1>
                  <p class="lead">스타가 되고 싶은 당신을 위한 홍보 플랫폼</p>
                  <div class="d-flex">
                      <a href="page/starCard/starInsert" class="btn btn-primary btn-lg me-3">무료로 참여하기</a>
                      <a href="page/starCard/starList" class="btn btn-secondary btn-lg">스타 보러가기</a>
                  </div>
                  <div class="row mb-3 mt-3">
                      <div class="col-md-12 d-flex align-items-center">
                          <input type="text" class="form-control me-2" id="main-search" placeholder="검색 키워드 입력" />
                          <button class="btn btn-primary" id="btn-mainSearch">검색</button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home