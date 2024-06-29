import React, { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContextProvider'
import './LoginForm.css'
const LoginForm = () => {
    const { login } = useContext(LoginContext)      // 🛢️ context

    const onLogin = (e) => {
        e.preventDefault()                      // 기본 이벤트 방지
        const form = e.target                   // form 요소
        const email = form.email.value    // 아이디 - form 아래 input name="username" 의 value
        const password = form.password.value    // 비밀번호 - form 아래 input name="password" 의 value

        login(email, password)
    }
    return (
        <div className="login-container">
            <div className="login-form text-center">
                <form onSubmit={ (e) => onLogin(e) }>
                    <div className="input-style">
                        <div style={{ height: '140px', display: 'flex', flexWrap: 'wrap', alignContent: 'space-around', justifyContent: 'center' }}>
                            <img style={{ width: '100px' }} src="/img/logo_ex.png" alt="logo" />
                        </div>
                        {/* <label htmlFor="inputEmail" className="sr-only">이메일 주소</label> */}
                        <input type="email" id="inputEmail" className="form-control mb-2" name="email" placeholder="이메일 주소" required autoFocus />
                        {/* <label htmlFor="inputPassword" className="sr-only">비밀번호</label> */}
                        <input type="password" id="inputPassword" className="form-control mb-2" name="password" placeholder="비밀번호" required />
                        <button className="loginbtn btn-lg btn-primary btn-block" type="submit">로그인</button>
                        <div className="login-find-text">
                            <a style={{ fontSize: 'medium' }} href="/page/recoverId">이메일찾기</a>
                            <p style={{ fontSize: 'small' }}>|</p>
                            <a style={{ fontSize: 'medium' }} href="/page/recoverPassword">비밀번호찾기</a>
                            <p style={{ fontSize: 'small' }}>|</p>
                            <a style={{ fontSize: 'medium' }} href="/join">회원가입</a>
                        </div>
                        <br />
                        <div className="other-login-icon">
                            <div>
                                <a href="#">
                                    <div className="other-login-img"><img src="/img/naver_login_btn2.png" alt="네이버 로그인" /></div>
                                </a>
                                <span style={{ fontSize: 'small' }}>네이버로그인</span>
                            </div>
                            <div>
                                <a href="/oauth2/authorization/kakao">
                                    <div className="other-login-img"><img src="/img/kakao_login_btn.png" alt="카카오 로그인" /></div>
                                </a>
                                <span style={{ fontSize: 'small' }}>카카오로그인</span>
                            </div>
                            <div>
                                <a href="#">
                                    <div className="other-login-img"><img src="/img/google_login_btn2.png" alt="구글 로그인" /></div>
                                </a>
                                <span style={{ fontSize: 'small' }}>구글로그인</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm