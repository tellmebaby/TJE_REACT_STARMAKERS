import React from 'react'
import InsertContainer from '../../containers/board/InsertContainer'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MainLayout from '../../layouts/MainLayout'

const Insert = () => {
  return (
    <>
        <MainLayout>
          <h1 className='d-flex justify-content-center mb-3 mt-3'>공지사항 등록</h1>
          <InsertContainer type={"an"}/>
        </MainLayout>
    </>
  )
}

export default Insert