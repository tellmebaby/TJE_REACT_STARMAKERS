import React from 'react'
import './css/starCard.css';  // 같은 폴더에 있는 CSS 파일을 import
import MainLayout from '../../layouts/MainLayout';
import HomeContainer from '../../containers/home/HomeContainer';



const Home = () => {
  return (
    <>
      <MainLayout>
        <HomeContainer />
      </MainLayout>

    </>
  )
}

export default Home