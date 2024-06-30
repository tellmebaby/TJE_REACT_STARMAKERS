import React from 'react'
import './css/starCard.css';  // 같은 폴더에 있는 CSS 파일을 import
import MainLayout from '../../layouts/MainLayout';
import MainContainer from '../../containers/main/MainContainer';



const Home = () => {
  return (
    <>
      <MainLayout>
        <MainContainer />
      </MainLayout>

    </>
  )
}

export default Home