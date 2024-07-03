import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContextProvider'; // LoginContext 경로를 실제 경로로 수정하세요
import { cardListToStarBoard } from '../../../apis/main/cards'; // card.js 파일의 경로를 수정하세요
import DangsmCard from '../../main/starcard/DangsmCard';
import './css/StarCardList.css'

const StarCardList = ({ options }) => {
  const { userInfo } = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cardListToStarBoard(Object.fromEntries(options), userInfo ? userInfo.userNo : 0, page);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [options, userInfo, page]);

  return (
    <div>
      <div>{Array.from(options.keys()).join(', ')}</div>
      <div>
      <div className='star-card-list' >
        {data.map((item) => (
          <div key={item.starNo} className='star-card-item'style={{ width: '170px' }}>
            <DangsmCard card={item}/>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default StarCardList;