import axios from 'axios';

export const getMessagesByUser = (userNo) => {
    return axios.get("/message/getChatMessagesByUser", {
        params: {
            userNo
        },
    });
};

export const insertMessageToAdmin = (message, userNo) => {
    return axios.post(`/message/insertToAdmin?userNo=${userNo}`, message);
};