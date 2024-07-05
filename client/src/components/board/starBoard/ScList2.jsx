import axios from 'axios';
import React, { useEffect, useState } from 'react';


// 메인 카드 목록 불러오기
export const starCardList = () => {
  alert("전체목록을 불렀어요");
  return axios.get("/mainlist");
};

const ScList2 = ({ keyword: initialKeyword }) => {
  const [data, setData] = useState([]);
  const [inputKeyword, setInputKeyword] = useState(initialKeyword);

  useEffect(() => {
    const fetchData = async () => {
      if (inputKeyword) {
        // 키워드 검색
        const response = await axios.get("/starList/api", {
          params: { keyword: inputKeyword, type: "starCard" }
        });
        setData(response.data);
      } else {
        // 메인 카드 목록 불러오기
        const response = await starCardList();
        setData(response.data);
      }
    };

    fetchData();
  }, [inputKeyword]);

  const handleInputChange = (event) => {
    setInputKeyword(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          value={inputKeyword}
          onChange={handleInputChange}
          placeholder="Search keyword"
        />
      </div>
      {/* 카드 목록 렌더링 */}
      <div>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default ScList2;