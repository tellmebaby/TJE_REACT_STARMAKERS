import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as qna from '../../apis/qna';
import QnaList from '../../components/board/QnaList';

const QnaListContainer = ({ optionList, option }) => {
    const [qnaList, setQnaList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const keyword = queryParams.get('keyword') || '';

    const getQnaList = async (page, keyword) => {
        setLoading(true);
        try {
            const response = await qna.qnaList(page, keyword);
            console.log("db 데이터 제발:", response);  // 콘솔 로그로 응답 데이터 확인
            setQnaList(response.qnaList || []);  // 응답 데이터 구조에 맞게 설정
            setPageInfo(response.page); // 페이지 정보 설정
        } catch (error) {
            console.error('Error fetching QNA list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getQnaList(currentPage, keyword);
    }, [currentPage, keyword]);

    const handlePageChange = (page) => {
        navigate(`/qna/qnaList?page=${page}&code=${option.code}&keyword=${option.keyword}`);
    };

    return (
        <QnaList
            qnaList={qnaList}
            isLoading={isLoading}
            optionList={optionList}
            page={pageInfo}
            option={{ code: queryParams.get('code') || '', keyword }}
            onPageChange={handlePageChange} // 페이지 변경 함수 전달
        />
    );
};

export default QnaListContainer;
