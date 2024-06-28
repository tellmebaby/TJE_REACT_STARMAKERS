import axios from 'axios';

// 목록
// export const list = (type, page, option) => {
//     let url = `/${type}`;
//     if (page) {
//       url += `&page=${page}`;
//     }
//     if (option) {
//       for (const key in option) {
//         if (option.hasOwnProperty(key)) {
//           url += `&${key}=${option[key]}`;
//         }
//       }
//     }
//     return axios.get(url);
//   }

export const list = async (type, page, option) => {
  try {
    console.log("Request URL:", `/${type}`);
    console.log("Request Parameters:", { type, page, code: option.code, keyword: option.keyword });

    const response = await axios.get(`/${type}`, {
      params: {
        page,
        code: option.code,
        keyword: option.keyword,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

// 조회
export const select = (no) => axios.get(`/boards/${no}`)

// 등록
// export const insert = (title, writer, content) => axios.post("/boards", {title, writer, content})
export const insert = (toBoard, FormData, headers) => axios.post( toBoard, FormData, headers )
// url, body, headers

// 수정
// export const update = (no, title, writer, content) => axios.put("/boards", {no, title, writer, content})
export const update = (formData, headers) => axios.put("/boards", formData, headers)

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`)