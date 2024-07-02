import axios from 'axios';

// 인기유저 목록
export const popularMembers = () => axios.get("/starMember");

export const getFragByReview = () => axios.get("/getFragByReview");

export const getFragByEvent = () => axios.get("/getFragByEvent");