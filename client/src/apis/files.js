import axios from 'axios'

// 업로드
export const upload = (formData, headers) => axios.post(`/file/upload`, formData, headers)

// 다운로드
export const download = (no) => axios.get(`/file/${no}`, {responseType:'blob'})

// 삭제
export const remove = (no) => axios.delete(`/file/${no}`)

// 선택삭제
export const removeFiles = (no) => axios.delete(`/file?no=${no}`)