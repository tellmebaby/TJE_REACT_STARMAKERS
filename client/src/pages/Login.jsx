import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import MainLayout from '../layouts/MainLayout'

const login = () => {
  return (
    <>
      <MainLayout>
          <LoginForm />
      </MainLayout>
    </>
  )
}

export default login