import api from './api';


export const payInsert = (data) => api.post(`/pay`, data)