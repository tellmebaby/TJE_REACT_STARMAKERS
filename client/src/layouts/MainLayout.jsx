import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const MainLayout = ({ children }) => {
  // 페이지 이동
  const navigate = useNavigate()
  return (
    <>
        <Header/>
            <div className="container">
              {React.cloneElement(children, { navigate })} {/* navigate를 props로 전달 */}
            </div>
        <Footer/>
        
    </>
  )
}

export default MainLayout