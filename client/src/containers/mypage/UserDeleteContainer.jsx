import React, { useContext } from 'react';
import * as mypage from '../../apis/mypage';
import UserDeleteForm from '../../components/mypage/UserDeleteForm';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as Swal from '../../apis/alert';

const UserDeleteContainer = () => {
    const { userInfo, isLogin, logout } = useContext(LoginContext);

    const userDelete = async () => {
        try {
            const response = await mypage.deleteUser(userInfo?.userNo);
            const data = await response.data;
            if (response.status === 200) {
                logout(true);
            }
        } catch (error) {
            console.error("Error during user delete:", error);
        }
    };

    const handleShow = () => {
        Swal.confirm("회원 탈퇴", "정말로 탈퇴하시겠습니까?", "warning", async (result) => {
            if (result.isConfirmed) {
                await userDelete();
            }
        });
    };

    return (
        <>
            <UserDeleteForm handleShow={handleShow} />
        </>
    );
};

export default UserDeleteContainer;
