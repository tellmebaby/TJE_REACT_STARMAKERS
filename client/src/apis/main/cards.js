import api from '../api';

// 처음 카드목록 불러오기 
export const starCardList = () => api.get("/mainlist");

// 홍보페이지 카드 목록 불러오기
export const cardListToStarBoard = (options, userNo, page = 1) => {
  return api.get("/starList/api", {
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
  return api.post("/Starlike", null, {
    params: {
      userNo,
      starNo,
    },
  });
};

// 좋아요 상태 확인
export const checkLiked = (userNo, starNo) => api.post('/checkLike', { userNo, starNo });

// 좋아요 토글
export const toggleLike = (userNo, starNo) => api.post('/like', { userNo, starNo });