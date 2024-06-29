import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../mypage/css/UserDeleteForm.module.css';

const UserDeleteForm = ({ user, userNo, userDelete }) => {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!checked) {
      alert('체크 박스를 체크해주세요.');
      return;
    }
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 함수 호출, userNo:', userNo); // userNo 로그 출력
    await userDelete();
    setShow(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className={styles.sideMenu}>
            <div className={styles.navLinks}>
              <Link to="/mypage/profile"><i className="fa-solid fa-user"></i>회원 정보</Link>
              <Link to="/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
              <Link to="/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
              <Link to="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
              <Link to="/mypage/inquiry"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
              <Link to="/mypage/userDelete" className={styles.active}><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className={styles.font}>
            <span style={{ fontSize: '30px', fontWeight: 'bolder' }}>정말로 탈퇴하시겠습니까?</span>
            <br />
            <span style={{ fontSize: '20px' }}>탈퇴 시 작성하신 글은 모두 삭제되며 복구가 불가능합니다.</span>
            <br />
            <span style={{ fontSize: '20px' }}>결제하신 상품에 대한 환불 또한 어려워지므로 탈퇴하시기 전 다시 한번 확인 부탁드립니다.</span>
          </div>
          <div className={styles.update}>
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className={styles.checkbox}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="checkbox" className={styles.noSelect} style={{ fontSize: '20px', marginLeft: '8px' }}>
              위 내용을 확인합니다.
            </label>
            <Button className={styles.button} onClick={handleShow}>
              탈퇴하기
            </Button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>정말 탈퇴하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>확인을 누르시면 바로 탈퇴가 진행됩니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDeleteForm;
