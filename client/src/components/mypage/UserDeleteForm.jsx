import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../mypage/css/UserDeleteForm.module.css';
import Menu from './Menu';

const UserDeleteForm = ({ handleShow }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (!checked) {
      alert('체크 박스를 체크해주세요.');
      return;
    }
    handleShow();
  };

  return (
    <div className="container">
      <div className="row">
      <Menu styles={styles}/>
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
            <Button className={styles.button} onClick={handleClick}>
              탈퇴하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteForm;
