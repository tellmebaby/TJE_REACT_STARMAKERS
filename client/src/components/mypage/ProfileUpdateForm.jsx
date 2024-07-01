import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mypage from '../../apis/mypage';
import styles from '../mypage/css/ProfileForm.module.css';

const ProfileUpdateForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    birth: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || '',
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        birth: user.birth || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mypage.update(formData);
      console.log('Updated user data:', response.data);
      navigate('/mypage/profile');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('회원정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2 mr-2">
          <div className={styles.sideMenu}>
            <div className={styles.navLinks}>
              <Link to="/mypage/profile" className={styles.active}><i className="fa-solid fa-user"></i>회원 정보</Link>
              <Link to="/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
              <Link to="/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
              <Link to="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
              <Link to="/mypage/inquiry"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
              <Link to="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="box">
            <div className={styles.tableMargin}></div>
            <form onSubmit={handleSubmit}>
              <table className="table my-0 py-0">
                <tbody>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">닉네임</td>
                    <td className="fs-5 align-middle border-0">
                      <input type="text" name="id" className="form-control fs-5" placeholder="닉네임" value={formData.id} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">이름</td>
                    <td className="fs-5 align-middle border-0">
                      {formData.name}
                      <input type="hidden" name="name" value={formData.name} />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">전화번호</td>
                    <td className="fs-5 align-middle border-0">
                      <input type="text" name="phone" className="form-control fs-5" placeholder="전화번호" value={formData.phone} onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">이메일</td>
                    <td className="fs-5 align-middle border-0">{formData.email}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">생년월일</td>
                    <td className="fs-5 align-middle border-0">{formData.birth}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5 text-center align-middle border-0">주소</td>
                    <td className="fs-5 align-middle border-0">
                      <input type="text" name="address" className="form-control fs-5" placeholder="주소" value={formData.address} onChange={handleChange} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.buttonContainer}>
                <input className={styles.button} type="submit" value="확인" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
