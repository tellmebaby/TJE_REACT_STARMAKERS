import api from './api';

// 회원 정보 조회
export const select = (email) => api.get(`/mypage/profile/${email}`);

// 회원 정보 수정
export const update = (user) => api.put('/mypage/profile', user)

// 회원 정보 탈퇴
export const deleteUser = (userNo) => api.delete(`/mypage/profile/${userNo}`)

// 마이페이지 qnaList
export const qnaList = (params) => api.get(`/mypage/qnaList`, {params});

// 상세 조회
export const qnaRead = (qnaNo) => { axios.get(`/mypage/qna/${qnaNo}`).then(response => response.data);
  };

// 선택된 QnA 항목 삭제
export const deleteQna = (qnaNos) => api.delete(`/qna/${qnaNos.join(',')}`);


// 프로필 이미지 업로드
export const profileUpload = (formData) => api.post(`/file/profileUpload`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});


export const profileDelete = (userNo) => api.delete(`/file/profileDelete/${userNo}`);

// 마이페이지 프로모션
export const promotionList = (params) => api.get(`/mypage/promotion`, {params})