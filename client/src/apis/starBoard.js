import axios from 'axios';

// 목록 조회
export const list = async (params) => {

  try {
    const response = await axios.get(`/starCard/List`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching list:', error);
    throw error;
  }
};

// 상세 조회
export const select = (starNo) => axios.get(`/${starNo}`);

// 등록
// export const insert = (title, writer, content) => axios.post("/boards", {title, writer, content})
export const insert = (FormData, headers) => axios.post("/starCard", FormData, headers)
// url, body, headers

// 수정
// export const update = (no, title, writer, content) => axios.put("/boards", {no, title, writer, content})
export const update = (formData, headers) => axios.put("/updateBoard", formData, headers)

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`);
// no: 삭제할 데이터의 ID 또는 식별자
