import api from './api';



// 목록 조회
export const list = async (params) => {

  try {
    const response = await api.get(`/starCard/List`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching list:', error);
    throw error;
  }
};

// 상세 조회
export const select = (starNo) => api.get(`/${starNo}`);

// 등록
// export const insert = (title, writer, content) => api.post("/boards", {title, writer, content})
export const insert = (FormData, headers) => api.post("/starCard", FormData, headers)
// url, body, headers

// 수정
// export const update = (no, title, writer, content) => api.put("/boards", {no, title, writer, content})
export const update = (formData, headers) => api.put("/updateBoard", formData, headers)

// 삭제
export const remove = (starNo) => api.delete(`/${starNo}`);
// no: 삭제할 데이터의 ID 또는 식별자

// 댓글 목록 조회
export const replyList= (starNo) => api.get(`/reply/${starNo}`);

// 댓글 등록
export const insertReply = (reply) => api.post('/reply', reply);

// 댓글 수정
export const updateReply = (reply) => api.put('/reply', reply);

// 댓글 삭제
export const deleteReply = (replyNo) => api.delete(`/reply/${replyNo}`);