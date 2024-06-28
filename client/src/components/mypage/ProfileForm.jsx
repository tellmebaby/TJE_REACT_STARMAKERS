import React, { useState } from 'react';
import styles from '../mypage/css/ProfileForm.module.css';

const MyPage = ({ user, file }) => {
    // const [uploadedImage, setUploadedImage] = useState(`/file/img/${file.fileNo}`);
    // const [fileInput, setFileInput] = useState(null);

    // const handleImageClick = () => {
    //     fileInput.click();
    // };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setUploadedImage(e.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const saveImage = () => {
    //     const file = fileInput.files[0];
    //     if (!file) {
    //         alert("파일을 선택해 주세요.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("user_no", user.userNo);

    //     const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    //     const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    //     axios.post('/file/upload', formData, {
    //         headers: {
    //             [csrfHeader]: csrfToken
    //         }
    //     })
    //     .then(response => {
    //         setUploadedImage(URL.createObjectURL(file));
    //         alert("이미지가 저장되었습니다.");
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('이미지 업로드 실패');
    //     });
    // };

    // const deleteImage = () => {
    //     const defaultImageUrl = 'path/to/default-image.jpg';

    //     const formData = new FormData();
    //     formData.append("user_no", user.userNo);

    //     const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    //     const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

    //     axios.delete('/file/allDelete', {
    //         data: formData,
    //         headers: {
    //             [csrfHeader]: csrfToken
    //         }
    //     })
    //     .then(response => {
    //         setUploadedImage(defaultImageUrl);
    //         alert("기본 이미지로 변경되었습니다.");
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('이미지 삭제 실패');
    //     });
    // };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className={styles.sideMenu}>
                        <div className={styles.navLinks}>
                            <a href="/mypage/profile" className="active"><i className="fa-solid fa-user"></i>회원 정보</a>
                            <a href="/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</a>
                            <a href="/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</a>
                            <a href="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</a>
                            <a href="/mypage/QnaList"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</a>
                            <a href="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <div className={styles.tableMargin}></div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">닉네임</td>
                                    <td className="fs-5 align-middle border-0">{user.id}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">이름</td>
                                    <td className="fs-5 align-middle border-0">{user.name}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">전화번호</td>
                                    <td className="fs-5 align-middle border-0">{user.phone}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">이메일</td>
                                    <td className="fs-5 align-middle border-0">{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">생년월일</td>
                                    <td className="fs-5 align-middle border-0">{user.birth}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold fs-5 text-center align-middle border-0">주소</td>
                                    <td className="fs-5 align-middle border-0">{user.address}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.buttonContainer}>
                            <a href="/page/mypage/profileUpdate">
                                <input className={styles.button} type="button" value="정보 수정" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3">
                    <div className={styles.tableMargin}></div>
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        <img id="uploadedImage" src={uploadedImage} alt="" style={{ width: '100%' }} />
                    </div>
                    <input type="file" id="fileInput" style={{ display: 'none' }} ref={input => setFileInput(input)} onChange={handleFileChange} />
                    <button className="btn btn-primary w-100 mt-1" onClick={saveImage}>이미지 저장</button>
                    <button className="btn btn-primary w-100 mt-1" onClick={deleteImage}>기본 이미지로 변경</button>
                </div> */}
            </div>
        </div>
    );
};

export default MyPage;
