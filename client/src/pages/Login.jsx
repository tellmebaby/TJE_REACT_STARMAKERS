import React from 'react'
import Header from '../components/Header'
import LoginForm from '../components/Login/LoginForm'

const login = () => {
  return (
    <>
    <Header/>
    <div className="container">
        <h1>Login</h1>
        <hr />
        <h2>로그인 페이지</h2>
        <LoginForm />
    </div>
</>
  )
}

export default login