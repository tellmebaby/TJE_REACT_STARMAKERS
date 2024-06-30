import axios from 'axios';

// 목록 조회
export const qnaList = ({page, option}) => {
  const params = {
    page,
    ...option,
  };
  return axios.get('/qna/qnaList', {params}).then(response => response.data);
};

// 상세 조회
export const select = (no) => {
  return axios.get(`/qna/qnaPost/${no}`).then(response => response.data);
};

// 등록
export const insert = (qnaBoard) => {
  return axios.post('/qna', qnaBoard).then(response => response.data);
};

// 수정
export const update = (qnaBoard) => {
  return axios.put('/qna', qnaBoard).then(response => response.data);
};

// 답변 등록
export const insertAnswer = (qnaBoard) => {
  return axios.put('/qna/answer', qnaBoard).then(response => response.data);
};

// 삭제
export const remove = (no) => {
  return axios.delete(`/qna/${no}`).then(response => response.data);
};

// 답변 삭제
export const deleteAnswer = (qnaBoard) => {
  return axios.put('/qna/deleteAnswer', qnaBoard).then(response => response.data);
};
