import React from 'react'
import Header from '../components/Header'
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import Search from '../components/main/Search'


const Home = () => {
  return (
    <>
        <Header />
        <Search />

        <div class="container">

    <div id="promotionCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-inner" id="carousel-inner">
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="content-wrapper">
                

            </div>
          
          <div class="content-wrapper">    
            <div class="contentIcon-container">
                <div class="contentIcon1" data-category="music">
                    <i class="bi bi-music-note"></i>
                    <p>음악</p>
                </div>
                <div class="contentIcon-backMusic"></div>
                <div class="contentIcon2" data-category="game">
                  <i class="bi bi-controller"></i>
                  <p>게임</p>
                </div>
                <div class="contentIcon-backGame"></div>
                <div class="contentIcon3" data-category="travel">
                  <i class="bi bi-backpack2"></i>
                  <p>여행</p>
                </div>
                <div class="contentIcon-backTravel"></div>
                <div class="contentIcon4" data-category="food">
                  <i class="bi bi-cake"></i>
                  <p>음식</p>
                </div>
                <div class="contentIcon-backFood"></div>
                <div class="contentIcon5" data-category="animal">
                  <i class="bi bi-feather"></i>
                  <p>동물</p>
                </div>
                <div class="contentIcon-backAnimal"></div>
                <div class="contentIcon6" data-category="asmr">
                  <i class="bi bi-mic"></i>
                  <p>ASMR</p>
                </div>
                <div class="contentIcon-backAsmr"></div>
                <div class="contentIcon7" data-category="workOut">
                  <i class="bi bi-bicycle"></i>
                  <p>운동</p>
                </div>
                <div class="contentIcon-backWork"></div>
                <div class="contentIcon8" data-category="fashion">
                  <i class="bi bi-person-arms-up"></i>
                  <p>패션</p>
                </div>
                <div class="contentIcon-backFashion"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
            <div class="starmember-wrapper">
                <div class="starmember-list">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="starmember-detail">
                                <div class="col">
                                    <span class="starmember-title1">#요새뜨는스타</span>
                                </div>
                                <div class="col" id="starMemberList"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="starmember-detail">
                                <div class="col">
                                    <span class="starmember-title1">#시작하는스타</span>
                                </div>
                                <div class="col" id="newStarMember"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    <div class="row justify-content-center">

    </div>
</div>

    </>
  )
}

export default Home