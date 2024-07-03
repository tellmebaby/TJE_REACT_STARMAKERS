import api from './api';

// 업로드
export const upload = (formData, headers) => api.post(`/file/upload`, formData, headers)

// 다운로드
export const download = (no) => api.get(`/file/${no}`, {responseType:'blob'})

// 삭제
export const remove = (no) => api.delete(`/file/${no}`)

// 선택삭제
export const removeFiles = (no) => api.delete(`/file?no=${no}`)