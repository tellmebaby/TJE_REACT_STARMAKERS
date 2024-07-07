import React, { useContext, useEffect, useState } from "react";
import MyPointForm from "../../components/mypage/MyPointForm";
import * as pay from "../../apis/pay";
import { LoginContext } from "../../contexts/LoginContextProvider";

const MyPointContainer = () => {
  const [pointList, setPointList] = useState([]);
  const { userInfo } = useContext(LoginContext);

  const userPointList = async () => {
    try {
      const response = await pay.pointList(userInfo.userNo);
      const data = response.data;

      setPointList(data);
    } catch (error) {
      console.error("Error fetching review list:", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };

  useEffect(() => {
    if (userInfo?.userNo) {
      userPointList();
    }
  }, [userInfo]);

  return (
    <MyPointForm
      pointList={pointList}
      userInfo={userInfo}
      userPointList={userPointList}
    />
  );
};

export default MyPointContainer;
