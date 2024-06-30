import axios from 'axios';

// 목록 조회
export const list = async (type, page, option) => {
    const params = {
      page,
      ...option,  // 추가적인 옵션이 있을 경우 params에 추가됨
    };
    return axios.get(`/${type}`, {params}).then(response => response.data)
};

// 상세 조회
export const select = (no) => axios.get(`/${no}`);

// 등록
// export const insert = (title, writer, content) => axios.post("/boards", {title, writer, content})
export const insert = (FormData, headers) => axios.post("/insertBoard", FormData, headers )
// url, body, headers

// 수정
// export const update = (no, title, writer, content) => axios.put("/boards", {no, title, writer, content})
export const update = (formData, headers) => axios.put("/updateBoard", formData, headers)

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`);
// no: 삭제할 데이터의 ID 또는 식별자
