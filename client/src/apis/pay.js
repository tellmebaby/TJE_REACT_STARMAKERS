import api from './api';

// 홍보카드 결제
export const payInsert = (data) => api.post(`/pay`, data)

// 포인트충전
export const pointAdd = (data) => api.post(`/pay/point`, data)

// 포인트내역
export const pointList = (no) => api.get(`/pay/point/${no}`);

// 후원금 조회
export const pointSelect = (data) => api.get(`/pay/point/select`, data);
