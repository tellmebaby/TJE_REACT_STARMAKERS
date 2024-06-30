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
export const insert = (toBoard, FormData, headers) => axios.post(toBoard, FormData, headers);
// toBoard: 요청 보낼 경로, FormData: 전송할 데이터, headers: 요청 헤더

// 수정
export const update = (formData, headers) => axios.put("/boards", formData, headers);
// formData: 수정할 데이터, headers: 요청 헤더

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`);
// no: 삭제할 데이터의 ID 또는 식별자
