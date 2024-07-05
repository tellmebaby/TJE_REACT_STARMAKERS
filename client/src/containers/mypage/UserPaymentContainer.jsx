import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import * as pay from '../../apis/pay';
import MyPayment from '../../components/mypage/MyPayment';


const UserPaymentContainer = () => {

  return (
    <MyPayment />
  );
};

export default UserPaymentContainer;