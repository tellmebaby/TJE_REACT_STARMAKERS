import React, { useEffect, useState } from 'react';
import List from '../../components/board/List';
import * as starBoard from '../../apis/starBoard'


const ListContainer = ({ type }) => {

  const [boardList, setBoardList] = useState([]);
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




  const getBoardList = async () => {
    setLoading(true);


    try {
      const params = {
        type: type,
        page: pageNo,
        code: code,
        keyword: keyword,
      }

      const response = await starBoard.list(params);
      setBoardList(response.starList || []);
      setPageInfo(response.page);
      setOptionList(response.optionList);


    } catch (error) {
      console.error('Error fetching list:', error);
    }

    setLoading(false);

  };

  useEffect(() => {
    getBoardList();
  }, [pageNo, keyword]);

  return (
    <List
      type={type}
      optionList={optionList}
      option={option}
      page={pageInfo}
      boardList={boardList}
      loading={isLoading}
    />
  );
};

export default ListContainer;
