import React, { useEffect, useState } from 'react';
import * as mypage from '../../apis/mypage';
import UserDeleteForm from '../../components/mypage/UserDeleteForm';
import { useNavigate } from 'react-router-dom';

const UserDeleteContainer = ({ userNo }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const userDelete = async () => {
        try {
            const response = await mypage.deleteUser(userNo);
            const data = await response.data
            console.log('userDelete 함수 호출, userNo:', userNo); // userNo 로그 출력
            console.log('Delete response:', response.data);
            navigate("/");
            setUser(data)
        } catch (error) {
            console.error("Error during user delete:", error);
        }
    };

    return (
        <>
            <UserDeleteForm userNo={userNo} user={user} userDelete={userDelete} />
        </>
    );
};

export default UserDeleteContainer;
