import React, { useEffect, useState, useContext } from 'react';
import ArchiveForm from '../../components/mypage/ArchiveForm';
import { mypageStarList } from '../../apis/mypage'; // API 호출 가져오기
import { LoginContext } from '../../contexts/LoginContextProvider';

const ArchiveContainer = () => {
  const { userInfo } = useContext(LoginContext); // userInfo 가져오기
  const [data, setData] = useState([]);

  console.log("data");
  console.log(data);

  const fetchData = async () => {
    if (!userInfo) return;

    const params = {
      userNo: userInfo.userNo
    };
    console.log("API call with params:", params);
    try {
      const response = await mypageStarList(params);
      setData(response.data);
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userInfo]); // userInfo가 변경될 때마다 fetchData 호출

  return (
    <>
      <ArchiveForm data={data} />
    </>
  );
}

export default ArchiveContainer;
