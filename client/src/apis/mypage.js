import axios from 'axios';

// 조회
export const select = (email) => axios.get(`/mypage/profile/${email}`)

// 마이페이지 qnaList
export const qnaList = () => axios.get("/mypage/qnaList")
