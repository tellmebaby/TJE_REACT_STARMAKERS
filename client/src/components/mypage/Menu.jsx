import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ styles }) => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="col-md-3">
            <div className={styles.sideMenu}>
                <div className={styles.navLinks}>
                    <Link to="/mypage/profile" className={pathname === '/mypage/profile' ? styles.active : ''}>
                        <i className="fa-solid fa-user"></i> 회원 정보
                    </Link>
                    <Link to="/mypage/payment" className={pathname === '/mypage/payment' ? styles.active : ''}>
                        <i className="fa-solid fa-credit-card"></i> 결제 내역
                    </Link>
                    <Link to="/mypage/promotion" className={pathname === '/mypage/promotion' ? styles.active : ''}>
                        <i className="fa-solid fa-edit"></i> 내가 쓴 글
                    </Link>
                    <Link to="/mypage/archive" className={pathname === '/mypage/archive' ? styles.active : ''}>
                        <i className="fa-solid fa-archive"></i> 내 보관함
                    </Link>
                    <Link to="/mypage/myPoint" className={pathname === '/mypage/myPoint' ? styles.active : ''}>
                        <i className="fa-solid fa-coins"></i> 내 포인트
                    </Link>
                    <Link to="/mypage/qnaList" className={pathname === '/mypage/qnaList' ? styles.active : ''}>
                        <i className="fa-solid fa-question-circle"></i> 1 : 1 문의
                    </Link>
                    <Link to="/mypage/userDelete" className={pathname === '/mypage/userDelete' ? styles.active : ''}>
                        <i className="fa-solid fa-user-slash"></i> 회원 탈퇴
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
