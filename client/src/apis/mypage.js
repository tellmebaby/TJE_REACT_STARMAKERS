import axios from 'axios';

// 조회
export const select = (email) => axios.get(`/mypage/profile/${email}`);

export const update = () => axios.put('mypage/profile')

// 마이페이지 qnaList
export const qnaList = () => axios.get("/mypage/qnaList");

// 선택된 QnA 항목 삭제
export const deleteQna = (qnaNos) => axios.delete(`/qna/${qnaNos.join(',')}`);
