import axios from 'axios';

// 목록 조회
export const qnaList = async (params) => {
 
  try {
    const response = await axios.get(`/qna/qnaList`, { params });
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('Error fetching list:', error);
    throw error; // 에러를 상위로 전파하거나 다른 처리 방법 선택
  }
};

// 상세 조회
export const select = (qnaNo) => {
  return axios.get(`/qna/qnaRead/${qnaNo}`).then(response => response.data);
};

// 등록
// export const insert = (qnaBoard) => {
//   return axios.post('/qna', qnaBoard).then(response => response.data);
// };
export const insert = (FormData, headers) => axios.post("/qna", FormData, headers )

// 수정
export const update = (qnaBoard) => {
  return axios.put('/qna', qnaBoard).then(response => response.data);
};

// 답변 등록
export const insertAnswer = (qnaBoard) => {
  return axios.put('/qna/answer', qnaBoard).then(response => response.data);
};

// 삭제
export const remove = (qnaNo) => {
  return axios.delete(`/qna/${qnaNo}`).then(response => response.data);
};

// 답변 삭제
export const deleteAnswer = (qnaBoard) => {
  return axios.put('/qna/deleteAnswer', qnaBoard).then(response => response.data);
};
