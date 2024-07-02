import React, { useEffect, useState } from 'react';
import './JoinForm.css';
import * as auth from '../../apis/auth.js'
import { useNavigate } from 'react-router-dom'

const JoinForm = () => {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate()

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch('/checkUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: nickname })
      });

      const isTaken = await response.json();
      if (isTaken) {
        alert("사용 불가능한 닉네임입니다.");
        setIsNicknameValid(false);
      } else {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameValid(true);
      }
    } catch (error) {
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
      console.error('Error:', error);
    }
  };

  const handleEmailSend = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch('/sendVerificationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ email }).toString()
      });

      if (response.ok) {
        alert("인증 메일이 발송되었습니다.");
        document.getElementById('emailVerificationGroup').style.display = 'block';
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      alert("이메일 발송 중 오류가 발생했습니다.");
      console.error('Error:', error);
    }
  };

  const handleEmailVerify = async () => {
    if (!emailVerificationCode.trim()) {
      alert("인증 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch('/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ code: emailVerificationCode, email }).toString()
      });

      const isVerified = await response.json();
      if (isVerified) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
      } else {
        alert("인증 코드가 유효하지 않습니다.");
        setIsEmailVerified(false);
      }
    } catch (error) {
      alert("이메일 인증 중 오류가 발생했습니다.");
      console.error('Error:', error);
      setIsEmailVerified(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    const usernameRegex = /^[가-힣]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문, 숫자, 특수문자를 포함하여 6글자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!usernameRegex.test(username)) {
      alert("이름은 한글만 입력할 수 있습니다.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("전화번호는 숫자만 입력할 수 있습니다.");
      return;
    }

    if (!isNicknameValid) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (!address || !addressDetail) {
      alert("주소를 입력해주세요.");
      return;
    }

    // 제출하기
    try {
      // 회원가입 데이터 준비
      const userData = {
        name: username,
        password,
        phone,
        id:nickname,
        email,
        address: `${address} ${addressDetail}`,
        birth,
        gender
      };
  
      // 회원가입 API 호출
      const response = await auth.join(userData);
  
      // 회원가입 성공 시 처리
      alert('회원가입이 완료되었습니다.');
      navigate("/login");

  
    } catch (error) {
      // 회원가입 실패 시 처리
      if (error.response) {
        // 서버가 응답한 상태 코드가 2xx가 아닌 경우
        console.error('Error:', error.response.data);
        alert('회원가입에 실패했습니다.');
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.error('No response:', error.request);
        alert('서버로부터 응답이 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        // 요청을 설정하는 중에 문제가 발생한 경우
        console.error('Error:', error.message);
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const handleAddressSearch = () => {
    const { daum } = window;
    new daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setHasSearched(true);
      }
    }).open();
  };

  useEffect(() => {
    // 스크립트 추가
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);



  return (
    <div className="joinContainer">
      <div className="join-style">
        <div className="signup-form">
          <div className="logo-container">
            <img src="/img/logo_ex4.png" alt="logo" className="logo" />
          </div>
          <form className='join-form' onSubmit={handleSubmit}>
            <div className="form-group">
              <label id="label" htmlFor="inputUserid">닉네임</label>
              <div className="input-group">
                <input
                  type="text"
                  id="inputUserid"
                  name="id"
                  className="form-control"
                  placeholder="닉네임"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleNicknameCheck}>중복확인</button>
              </div>
              <small id="idCheckResult" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword">비밀번호</label>
              <input
                type="password"
                id="inputPassword"
                name="password"
                className="form-control"
                placeholder="비밀번호"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="비밀번호 확인"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputUsername">이름</label>
              <input
                type="text"
                id="inputUsername"
                name="name"
                className="form-control"
                placeholder="사용자 이름"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">성별</label>
              <div className="join-check-gender">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="남성"
                    name="gender"
                    id="genderMale"
                    required
                    checked={gender === '남성'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="genderMale">남성</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="여성"
                    name="gender"
                    id="genderFemale"
                    checked={gender === '여성'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">여성</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="datepicker">생년월일</label>
              <input
                type="date"
                id="datepicker"
                name="birth"
                className="form-control"
                required
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputEmail">이메일</label>
              <div className="input-group">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  placeholder="이메일"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleEmailSend}>인증 메일 발송</button>
              </div>
            </div>

            <div className="form-group" id="emailVerificationGroup" style={{ display: isEmailVerified ? 'block' : 'none' }}>
              <div className="input-group">
                <input
                  type="text"
                  id="emailVerificationCode"
                  className="form-control"
                  placeholder="인증 코드"
                  value={emailVerificationCode}
                  onChange={(e) => setEmailVerificationCode(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleEmailVerify}>인증</button>
              </div>
            </div>

            <div id="emailCheckResult"></div>

            <div className="form-group">
              <label htmlFor="inputPhone">전화번호</label>
              <input
                type="text"
                id="inputPhone"
                name="phone"
                className="form-control"
                placeholder="전화번호"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputAddress">주소</label>
              <div className="input-group">
                <input
                  type="text"
                  id="inputAddress"
                  name="address"
                  className="form-control"
                  placeholder="주소"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => {
                    if (!hasSearched) {
                        handleAddressSearch();
                    }
                }}
                />
                <button type="button" className="btn btn-secondary" id="addressSearchBtn" onClick={handleAddressSearch}>
                  주소 검색
                </button>
              </div>

              <input
                type="text"
                name="address_detail"
                className="form-control"
                placeholder="상세주소"
                required
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>

            <button id="input-btn" className="joinbtn btn-lg btn-primary btn-block" type="submit">가입하기</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
