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
            const data = response.data;
            setUser(data)
            console.log('userDelete 함수 호출, userNo:', userNo); // userNo 로그 출력
            console.log("data : " + data);
            console.log("response : " + response);
            navigate("/");
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
