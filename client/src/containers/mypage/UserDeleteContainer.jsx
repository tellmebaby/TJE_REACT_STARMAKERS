import React, { useContext } from 'react';
import * as mypage from '../../apis/mypage';
import UserDeleteForm from '../../components/mypage/UserDeleteForm';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as Swal from '../../apis/alert'

// 👩‍🏫 pages/UserDelete.jsx 에서 props 로 내려준게 없는데 어케 가져옴
// ➡ 📦Context 에서 userInfo 가져와서 그 안에 userNo 가져와야함.
// const UserDeleteContainer = ({ userNo }) => {        
const UserDeleteContainer = () => {
    const { userInfo, isLogin, logout, roles } = useContext(LoginContext);

    const userDelete = async () => {

        // 👩‍🏫 
        // 📦Context 에서 userInfo 가져와서 그 안에 userNo 가져와야함.
        console.log(`isLogin : ${isLogin}`);
        console.log(`userInfo : ${userInfo}`);
        console.log(`userInfo.userNo : ${userInfo.userNo}`);

        Swal.confirm("회원 탈퇴", "정말로 탈퇴하시겠습니까?", "warning",
            async (result) => {
                // isConfirmed : 확인버튼 클릭 여부
                if( result.isConfirmed ) {
                    try {
                        const response = await mypage.deleteUser(userInfo?.userNo);
                        const data = await response.data
                        console.log('userDelete 함수 호출, userNo:', userInfo.userNo); // userNo 로그 출력
                        console.log('Delete response:', response.data);
                        console.log('회원 탈퇴 요청 status : ', response.status);
                        // 👩‍🏫 메인으로만 이동하지 말고 로그아웃 처리가 필요할 듯
                        // navigate("/");
                        // setUser(data)
                        if( response.status == 200 ) {
                            logout(true)
                        }
                    } catch (error) {
                        console.error("Error during user delete:", error);
                    }
                }
            }
        )
    };

    return (
        <>
            <UserDeleteForm userDelete={userDelete} />
        </>
    );
};

export default UserDeleteContainer;
