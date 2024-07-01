import axios from 'axios';

// 처음 카드목록 불러오기 
export const starCardList = () => axios.get("/mainlist");


