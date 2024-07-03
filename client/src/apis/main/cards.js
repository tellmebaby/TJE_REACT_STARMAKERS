import axios from 'axios';

// 처음 카드목록 불러오기 
export const starCardList = () => axios.get("/mainlist");

// 홍보페이지 카드 목록 불러오기
export const cardListToStarBoard = (options, userNo, page = 1) => {
  return axios.get("/starList/api", {
    params: {
      type: "starCard",
      userNo,
      page,
      ...options,
    },
  });
};

// 좋아요
export const StarLike = (userNo, starNo) => {
  return axios.post("/like", null, {
    params: {
      userNo,
      starNo,
    },
  });
};