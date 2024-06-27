import axios from 'axios';

// 목록
export const list = (type, page, option) => axios.get("/boards")

// 조회
export const select = (no) => axios.get(`/boards/${no}`)

// 등록
// export const insert = (title, writer, content) => axios.post("/boards", {title, writer, content})
export const insert = (FormData, headers) => axios.post("/boards", FormData, headers )
// url, body, headers

// 수정
// export const update = (no, title, writer, content) => axios.put("/boards", {no, title, writer, content})
export const update = (formData, headers) => axios.put("/boards", formData, headers)

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`)