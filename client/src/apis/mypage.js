import axios from 'axios';

// 회원 정보 조회
export const select = (email) => axios.get(`/mypage/profile/${email}`);

// 회원 정보 수정
export const update = (user) => axios.put('/mypage/profile', user)

// 회원 정보 탈퇴
export const deleteUser = (userNo) => axios.delete(`/mypage/profile/${userNo}`)

// 마이페이지 qnaList
export const qnaList = () => axios.get("/mypage/qnaList");

// 선택된 QnA 항목 삭제
export const deleteQna = (qnaNos) => axios.delete(`/qna/${qnaNos.join(',')}`);

// qnaList 페이징
export const fetchQnaList = (page, size) => {
    return axios.get(`/mypage/qnaList?page=${page}&size=${size}`);
};

// 프로필 이미지 업로드
export const profileUpload = (formData) => axios.post(`/file/profileUpload`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// 프로필 이미지 삭제
export const profileDelete = (userNo) => axios.delete(`/file/profileDelete/${userNo}`);
