import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import ProfileForm from '../../components/mypage/ProfileForm';

const ProfileContainer = ({ email }) => {
    const [user, setUser] = useState({});
    const [fileList, setFileList] = useState('');

    // 사용자 정보 조회
    const getUser = async () => {
        try {
            const response = await mypage.select(email);
            const data = response.data;
            setUser(data.user);
            console.log(data.user);

            const file = data.file;
            if (file && file.fileNo !== -1) {
                setFileList(`/file/img/${file.fileNo}?${new Date().getTime()}`);
            } else {
                setFileList('/file/img/default.jpg'); // 기본 이미지 설정
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // 이미지 저장
    const saveImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await mypage.profileUpload(formData);
            const filePath = response.data.filePath; // 서버가 반환하는 파일 경로를 사용

            console.log("API 응답 데이터: ", response.data);
            setFileList(`/file/img/${filePath}?${new Date().getTime()}`); // 이미지 저장 후 파일 경로 업데이트
            alert('이미지가 저장되었습니다.');
            window.location.reload(); // 페이지 새로 고침
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error.message);
            alert('이미지 업로드 실패');
        }
    };

    // 이미지 삭제
    const deleteImage = async () => {
        try {
            const defaultImageUrl = 'path/to/default-image.jpg'; // 기본 이미지 URL로 설정

            if (user.userNo) {
                const response = await mypage.profileDelete(user.userNo); // 이미지 삭제 요청
                if (response.status === 200) {
                    setFileList(defaultImageUrl); // 기본 이미지 URL로 설정
                    alert('기본 이미지로 변경되었습니다.');
                    window.location.reload(); // 페이지 새로 고침
                } else {
                    alert('이미지 삭제 실패');
                }
            } else {
                alert('유저 정보가 없습니다.');
            }
        } catch (error) {
            console.error('Error deleting image:', error.response ? error.response.data : error.message);
            alert('이미지 삭제 실패');
        }
    };

    // 컴포넌트가 처음 렌더링 될 때 사용자 정보 조회
    useEffect(() => {
        getUser();
    }, []);

    return (
        <ProfileForm
            email={email}
            user={user}
            fileList={fileList}
            onSaveImage={saveImage}
            onDeleteImage={deleteImage}
        />
    );
};

export default ProfileContainer;
