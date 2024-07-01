import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as qna from '../../apis/qna';
import QnaList from '../../components/board/QnaList';

const QnaListContainer = () => {
    const [qnaList, setQnaList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState({});
    const [optionList, setOptionList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page')) || 1;
    const code = queryParams.get('code') || '';
    const keyword = queryParams.get('keyword') || '';


//    const optionList = []
    const page2 = {
      page: currentPage,
    };
    const option = {
      code: '', // 초기값 설정
      keyword: '', // 초기값 설정
    };



    const getQnaList = async (page, option) => {
        setLoading(true);
        try {
            const response = await qna.qnaList(page, option);
            console.log("db 데이터 제발:", response);  // 콘솔 로그로 응답 데이터 확인
            console.log("page:", page)
            setQnaList(response.qnaList || []);  // 응답 데이터 구조에 맞게 설정
            setPageInfo(response.page); // 페이지 정보 설정
            setOptionList(response.optionList)
            
            console.log("페이지 제발:", pageInfo)
        } catch (error) {
            console.error('Error fetching QNA list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getQnaList(page2, option);
    }, [location.search]);

    useEffect(() => {
    console.log("페이지 제발:", pageInfo); 
}, [pageInfo]); 

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
            onPageChange={handlePageChange}
        />
    );
};

export default QnaListContainer;
          