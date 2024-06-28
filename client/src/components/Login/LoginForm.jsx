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

        login( email, password )
    }
    return (
        <div className="form">
            <h2 className="login-title">Login</h2>

            <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                <div>
                    <label htmlFor="name">email</label>
                    <input type="text"
                           id='email'
                           placeholder='email'
                           name='email'
                           autoComplete='email'
                           required
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password"
                           id='passowrd'
                           placeholder='password'
                           name='password'
                           autoComplete='password'
                           required
                    />
                </div>
                <button type='submit' className='btn btn--form btn-login'>
                    Login                    
                </button>
            </form>
        </div>
    )
}
export default LoginForm