import React from 'react'
import Header from '../components/Header'
import LoginForm from '../components/Login/LoginForm'
import MainLayout from '../layouts/MainLayout'

const login = () => {
  return (
    <>
      <MainLayout>
        <div className="container">
          <h1>Login</h1>
          <hr />
          <h2>로그인 페이지</h2>
          <LoginForm />
        </div>
      </MainLayout>
    </>
  )
}

export default login