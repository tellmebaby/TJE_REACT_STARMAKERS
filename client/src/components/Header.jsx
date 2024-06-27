import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContextProvider'
import {Link} from 'react-router-dom'
import './Header.css'


const Header = () => {

    // 🛢️ LoginContext 가져오기
    // 🛢️ isLogin
    // 😃 logout
    const { isLogin, logout } = useContext(LoginContext)

  return (
    <header>
        <div className="logo">
            <Link to="/">
                <img src="https://i.imgur.com/fzADqJo.png" alt="logo" className='logo' />
            </Link>
        </div>
        <div className="util">
            <ul>
                {/* 로그인 여부 (isLogin) 에 따라서 조건부 렌더링 */}
                {
                    isLogin ?
                    <>
                     
                        <li><Link to="src/pages/board/Insert.jsx">글쓰기</Link></li>
                        <li><Link to="src/pages/User.jsx">마이페이지</Link></li>
                        <li><button className='link' onClick={() => logout() }>로그아웃</button></li>
                    </>
                    :
                    <>
                        <li><Link to="/board/Insert">글쓰기</Link></li>
                        <li><Link to="/Login">로그인</Link></li>
                        <li><Link to="/Join">회원가입</Link></li>       
                        <li><Link to="/About">소개</Link></li>
                    </>
                }
            </ul>
        </div>
    </header>
  )
}

export default Header