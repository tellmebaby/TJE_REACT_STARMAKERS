import React, { useContext } from 'react'
import './Footer.css'
import { LoginContext } from '../contexts/LoginContextProvider';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';

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
                // 플로팅 버튼
                <div className="floating" id="chatButton">
                    <a href="javascript:void(0);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
                        </svg>
                    </a>

                    <div className="chat-container">
                        <h5>채팅</h5>
                        <div className="chat-messages" id="chatMessages">
                            <p>안녕하세요! 무엇을 도와드릴까요?</p>
                        </div>
                        
                    </div>
                    <div className="chat-input mt-2">
                        <form id="messageForm">
                            <input type="hidden" id="inputCsrf" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            <input type="text" className="form-control" name="content" placeholder="입력하세요..." id="chatInput"/>
                            <input type="hidden" name="code" value="toAdmin"/>
                        </form>
                    </div>
                </div>
            )}

        </footer>
    )
}

export default Footer