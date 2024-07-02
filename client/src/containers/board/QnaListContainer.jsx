import React, { useEffect, useState } from 'react';
import * as qna from '../../apis/qna';
import QnaList from '../../components/board/QnaList';

const QnaListContainer = () => {
    const [qnaList, setQnaList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [pageInfo, setPageInfo] = useState({});
    const [optionList, setOptionList] = useState([]);

    const [pageNo, setPage] = useState(1);
    const [code, setCode] = useState(0);
    const [keyword, setKeyword] = useState('');


    const option = {
        code: code,
        keyword: keyword,
    };
  
    const getQnaList = async () => {
        setLoading(true);
        try {

            const params = {
                page: pageNo,
                code: code,
                keyword: keyword,
            }

            const response = await qna.qnaList(params);
            setQnaList(response.qnaList || []); 
            setPageInfo(response.page);
            setOptionList(response.optionList);
            console.log("page", pageNo)
        } catch (error) {
            console.error('Error fetching QNA list:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getQnaList();
    }, [pageNo, keyword]);



    return (
        <QnaList
            qnaList={qnaList}
            isLoading={isLoading}
            page={pageInfo}
            optionList={optionList}
            option = {option}
            setPage={setPage}
            setCode={setCode}
            setKeyword={setKeyword}
        />
    );
};

export default QnaListContainer;
