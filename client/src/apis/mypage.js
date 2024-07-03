import axios from 'axios';

// 회원 정보 조회
export const select = (email) => axios.get(`/mypage/profile/${email}`);

// 회원 정보 수정
export const update = (user) => axios.put('/mypage/profile', user)

// 회원 정보 탈퇴
export const deleteUser = (userNo) => axios.delete(`/mypage/profile/${userNo}`)

// 마이페이지 qnaList
export const qnaList = (params) => axios.get(`/mypage/qnaList`, {params});

// 상세 조회
export const qnaRead = (qnaNo) => { axios.get(`/mypage/qna/${qnaNo}`).then(response => response.data);
  };

// 선택된 QnA 항목 삭제
export const deleteQna = (qnaNos) => axios.delete(`/qna/${qnaNos.join(',')}`);

// 마이페이지 reviewList
export const reviewList = (params) => axios.get(`/mypage/reviewList`, {params})

// 선택된 QnA 항목 삭제
export const deleteReview = (starNos) => axios.delete(`/mypage/review/${starNos.join(',')}`);

// 프로필 이미지 업로드
export const profileUpload = (formData) => axios.post(`/file/profileUpload`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// 프로필 이미지 삭제
export const profileDelete = (userNo) => axios.delete(`/file/profileDelete/${userNo}`);

// 마이페이지 프로모션
export const promotionList = (params) => axios.get(`/mypage/promotion`, {params})
