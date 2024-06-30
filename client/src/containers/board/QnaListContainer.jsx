import React, { useEffect, useState } from 'react';
import * as qna from '../../apis/qna';
import QnaList from '../../components/board/QnaList';


const QnaListContainer = ({ optionList, page, option }) => {
    const [qnaList, setQnaList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getQnaList = async () => {
        setLoading(true);
        try {
            const response = await qna.qnaList(page, option);
            console.log("db 데이터 제발:", response);  // 콘솔 로그로 응답 데이터 확인
            setQnaList(response.qnaList || []);  // 응답 데이터 구조에 맞게 설정
        } catch (error) {
            console.error('Error fetching QNA list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getQnaList();
    }, [page, option]);

    useEffect(() => {
        console.log("왜 상태 업데이트가 안될까...:", qnaList);
    }, [qnaList]);

    return (
        <QnaList
            qnaList={qnaList}
            isLoading={isLoading}
            optionList={optionList}
            page={page}
            option={option}
        />
    );
};

export default QnaListContainer;
