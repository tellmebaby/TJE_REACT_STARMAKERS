import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../mypage/css/QnaListForm.module.css';
import { formatDate } from '../../apis/format';

const QnaList = ({ user }) => {
    const [qnaList, setQnaList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('/api/qnaList')
    //         .then(response => {
    //             setQnaList(response.data);
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching qna list:', error);
    //             setIsLoading(false);
    //         });
    // }, []);

    const handleDelete = () => {
        const checkboxes = document.querySelectorAll('input[name="qnaNo"]:checked');
        if (checkboxes.length === 0) {
            alert('하나 이상의 게시물을 선택하십시오.');
            return;
        }

        const confirmDelete = window.confirm('선택한 게시물을 삭제하시겠습니까?');
        if (!confirmDelete) {
            return;
        }

        const qnaNos = Array.from(checkboxes).map(checkbox => checkbox.value);
        axios.post('/page/board/qnaBoard/qnaDelete', { qnaNos })
            .then(response => {
                alert('삭제되었습니다.');
                setQnaList(qnaList.filter(qna => !qnaNos.includes(qna.qnaNo.toString())));
            })
            .catch(error => {
                console.error('Error deleting qna:', error);
            });
    };

    const handleUpdate = () => {
        const checkboxes = document.querySelectorAll('input[name="qnaNo"]:checked');
        if (checkboxes.length === 0) {
            alert('하나의 게시물을 선택하십시오.');
            return;
        }

        if (checkboxes.length > 1) {
            alert('수정할 게시물 하나만 선택하십시오.');
            return;
        }

        const qnaNo = checkboxes[0].value;
        navigate(`/page/mypage/qnaUpdate?qnaNo=${qnaNo}`);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className={styles.sideMenu}>
                        <div className={styles.navLinks}>
                            <Link to="/page/mypage/profile"><i className="fa-solid fa-user"></i>회원 정보</Link>
                            <Link to="/page/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
                            <Link to="/page/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
                            <Link to="/page/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
                            <Link to="/page/mypage/inquiry" className={styles.active}><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
                            <Link to="/page/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className={styles.list}>
                        <h2 className={styles.juaRegular}>1 : 1 문의</h2>
                    </div>
                    {/* {
                        isLoading &&
                        <div>
                            <img src="/img/loading.webp" alt="loading" width="100%"></img>
                        </div>
                    } */}
                    {/* { */}
                        {/* !isLoading && qnaList && ( */}
                            <table border={1} className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}></th>
                                        <th style={{ width: '500px' }}>제목</th>
                                        <th style={{ width: '200px' }}>작성일자</th>
                                        <th style={{ width: '100px' }}>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {qnaList.map((qna) => (
                                        qna.userNo === user.userNo && (
                                            <tr key={qna.qnaNo}>
                                                {/* <td><input type="checkbox" name="qnaNo" value={qna.qnaNo} /></td> */}
                                                <td>안녕</td>
                                                <td align="center">
                                                    <Link to={`/page/mypage/qnaPost?qnaNo=${qna.qnaNo}`}>
                                                        {qna.title}
                                                    </Link>
                                                </td>
                                                <td align="center">
                                                    <span>{formatDate(qna.regDate)}</span>
                                                </td>
                                                <td align="center" className={qna.status === '답변 대기' ? styles.statusWaiting : styles.statusCompleted}>
                                                    {qna.status}
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        {/* ) */}
                    {/* } */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleUpdate}>수정</button>
                        <button className={styles.button} onClick={handleDelete}>삭제</button>
                    </div>
                    <center>
                        <div>
                            <Link to="/page/mypage/inquiry?page=first">&laquo;</Link>
                            {/* 이전 페이지 링크 */}
                            {/* 페이지 번호 링크 */}
                            {/* 다음 페이지 링크 */}
                            <Link to="/page/mypage/inquiry?page=last">&raquo;</Link>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default QnaList;
