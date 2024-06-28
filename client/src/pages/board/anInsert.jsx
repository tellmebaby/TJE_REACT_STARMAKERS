import React from 'react'
import InsertContainer from '../../containers/board/InsertContainer'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Insert = () => {
  return (
    <>
        <Header/>
        <h1>공지사항 등록</h1>
        <InsertContainer/>
        <Footer/>
    </>
  )
}

export default Insert