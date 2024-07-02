import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mypage from '../../apis/mypage';
import styles from '../mypage/css/QnaListForm.module.css';
import { formatDate } from '../../apis/format';

const QnaListForm = ({ qnaList, user, page, setPage, setCode }) => {
    console.log("page : " + page);
    console.log(page);
    const navigate = useNavigate();
    const [selectedQnaNos, setSelectedQnaNos] = useState([]);

    useEffect(() => {
        console.log('QnaListForm qnaList:', qnaList);
        console.log('QnaListForm user:', user);
    }, [qnaList, user]);

    const handleCheckboxChange = (qnaNo) => {
        setSelectedQnaNos((prevSelected) =>
            prevSelected.includes(qnaNo)
                ? prevSelected.filter((no) => no !== qnaNo)
                : [...prevSelected, qnaNo]
        );
    };

    const handleDelete = async () => {
        if (selectedQnaNos.length === 0) {
            alert('하나 이상의 게시물을 선택하십시오.');
            return;
        }

        const confirmDelete = window.confirm('선택한 게시물을 삭제하시겠습니까?');
        if (!confirmDelete) {
            return;
        }

        try {
            await mypage.deleteQna(selectedQnaNos);
            alert('삭제되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting qna:', error);
        }
    };

    const handleUpdate = () => {
        if (selectedQnaNos.length === 0) {
            alert('하나의 게시물을 선택하십시오.');
            return;
        }

        if (selectedQnaNos.length > 1) {
            alert('수정할 게시물 하나만 선택하십시오.');
            return;
        }

        const qnaNo = selectedQnaNos[0];
        navigate(`/page/mypage/qnaUpdate?qnaNo=${qnaNo}`);
    };

    const handleClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    const userQnaList = Array.isArray(qnaList) ? qnaList.filter(qna => qna.userNo === user.userNo) : [];

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
                            <Link to="/mypage/QnaList" className={styles.active}><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
                            <Link to="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className={styles.list}>
                        <h2 className={styles.juaRegular}>1 : 1 문의</h2>
                    </div>
                    {userQnaList.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10px' }}></th>
                                    <th style={{ width: '600px' }}>제목</th>
                                    <th style={{ width: '240px' }}>작성일자</th>
                                    <th style={{ width: '90px' }}>상태</th>
                                </tr>
                            </thead>
                            {userQnaList.map((qna) => (
                                <tr key={qna.qnaNo}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="qnaNo"
                                            value={qna.qnaNo}
                                            onChange={() => handleCheckboxChange(qna.qnaNo)}
                                        />
                                    </td>
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
                            ))}
                        </table>
                    ) : (
                        <p>질문이 없습니다.</p>
                    )}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleUpdate}>수정</button>
                        <button className={styles.button} onClick={handleDelete}>삭제</button>
                    </div>
                    {/* 페이지네이션 */}
                    <center>
                        <div className={styles.pagination}>
                            {/* [ 처음으로 ] */}

                            <span className="material-symbols-outlined" onClick={() => handleClick(page.first)} >first_page</span>

                            {/* [ 이전 ] */}
                            {page.page !== page.first && (
                                <span className="material-symbols-outlined" onClick={() => handleClick(page.prev)} >chevron_backward</span>
                            )}

                            {/* 페이지 번호 맵핑 */}
                            {Array.from({ length: page.end - page.start + 1 }, (_, i) => page.start + i).map(no => (
                                page.page === no ? (
                                    <b key={no}><span>{no}</span></b>
                                ) : (
                                    <span onClick={() => handleClick(no)} style={{ padding: '0 7px' }}>{no}</span>
                                )
                            ))}

                            {/* [ 다음 ] */}
                            {page.page !== page.last && (
                                <span className="material-symbols-outlined" onClick={() => handleClick(page.next)} >chevron_forward</span>
                            )}

                            {/* [ 마지막 ] */}
                            <span className="material-symbols-outlined" onClick={() => handleClick(page.last)} >last_page</span>

                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default QnaListForm;
