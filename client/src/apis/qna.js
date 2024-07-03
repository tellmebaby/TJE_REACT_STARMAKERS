import api from './api';

// 목록 조회
export const qnaList = async (params) => {
 
  try {
    const response = await api.get(`/qna/qnaList`, { params });
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('Error fetching list:', error);
    throw error; // 에러를 상위로 전파하거나 다른 처리 방법 선택
  }
};

// 상세 조회
export const select = (qnaNo) => {
  return api.get(`/qna/qnaRead/${qnaNo}`).then(response => response.data);
};

// 등록
// export const insert = (qnaBoard) => {
//   return api.post('/qna', qnaBoard).then(response => response.data);
// };
export const insert = (FormData, headers) => api.post("/qna", FormData, headers )

// 수정
// export const update = (qnaBoard) => {
//   return api.put('/qna', qnaBoard).then(response => response.data);
// };
export const update = (formData, headers) => api.put("/qna", formData, headers)

// 답변 등록
export const insertAnswer = (qnaBoard) => {
  return api.put('/qna/answer', qnaBoard).then(response => response.data);
};

// 삭제
export const remove = (qnaNo) => {
  return api.delete(`/qna/${qnaNo}`).then(response => response.data);
};

// 답변 삭제
export const deleteAnswer = (qnaBoard) => {
  return api.put('/qna/deleteAnswer', qnaBoard).then(response => response.data);
};
