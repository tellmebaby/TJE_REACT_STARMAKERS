import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../mypage/css/ProfileForm.module.css';

const ProfileForm = ({ user, fileList, onSaveImage, onDeleteImage }) => {
    const [fileInput, setFileInput] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    console.log("dd");
    console.log(previewImage);

    useEffect(() => {
        setPreviewImage(fileList);
    }, [fileList]);

    const handleImageClick = () => {
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveImage = () => {
        const file = fileInput.files[0];
        if (!file) {
            alert("파일을 선택해 주세요.");
            return;
        }
        onSaveImage(file);
    };

    const deleteImage = () => {
        onDeleteImage();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className={styles.sideMenu}>
                        <div className={styles.navLinks}>
                            <Link to="/mypage/profile" className={styles.active}><i className="fa-solid fa-user"></i>회원 정보</Link>
                            <Link to="/mypage/payment"><i className="fa-solid fa-credit-card"></i>결제 내역</Link>
                            <Link to="/mypage/promotion"><i className="fa-solid fa-edit"></i>내가 쓴 글</Link>
                            <Link to="/mypage/archive"><i className="fa-solid fa-archive"></i>내 보관함</Link>
                            <Link to="/mypage/QnaList"><i className="fa-solid fa-question-circle"></i>1 : 1 문의</Link>
                            <Link to="/mypage/userDelete"><i className="fa-solid fa-user-slash"></i>회원 탈퇴</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box">
                        <div className={styles.tableMargin}></div>
                        <table className="table">
                            <tbody className={styles.profile}>
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
                            <Link to="/mypage/profileUpdate">
                                <input className="btn btn-primary btn-lg" type="button" value="정보 수정" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className={styles.tableMargin}></div>
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        <img id="uploadedImage" src={previewImage} alt="" style={{ width: '100%' }} />
                    </div>
                    <input type="file" id="fileInput" style={{ display: 'none' }} ref={input => setFileInput(input)} onChange={handleFileChange} />
                    <button className="btn btn-primary w-100 mt-1" onClick={saveImage}>이미지 저장</button>
                    <button className="btn btn-primary w-100 mt-1" onClick={deleteImage}>기본 이미지로 변경</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
