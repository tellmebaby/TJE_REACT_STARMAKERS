import React, { useContext } from 'react'
import './Footer.css'
import { LoginContext } from '../contexts/LoginContextProvider';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import NewChat from './NewChat';

const Footer = () => {
    const { isLogin, logout, userRole, csrfToken } = useContext(LoginContext);

    return (
        <footer>
            <p>&copy; 2024 StarMakers</p>
            <p>
                <span className="bold-text">고객센터</span> 1234-5678 <span className="bold-text">e-mail</span> starmaker@gmail.com
            </p>
            <p>
                <span className="icons">
                    <a href="https://www.instagram.com/dang.seu.man/" aria-label="Instagram" target="_blank" rel="noreferrer noopener">
                        <img src="/img/instagram.png" alt="Instagram" />
                    </a>
                    <a href="http://pf.kakao.com/_PxbgxcG" aria-label="KakaoTalk" target="_blank" rel="noreferrer noopener">

                        <img src="/img/kakaotalk.png" alt="KakaoTalk" />

                    </a>
                    <a href="https://www.youtube.com/channel/UCtv-8yPXWcpg__Dri7ueVZg" aria-label="YouTube" target="_blank" rel="noreferrer noopener">
                        <img src="/img/youtube.png" alt="YouTube" />
                    </a>
                </span>
            </p>
            {!isLogin ? (
                <>

                </>
            ) : (
                <div>
                    <NewChat />
                </div>
            )}

        </footer>
    )
}

export default Footer