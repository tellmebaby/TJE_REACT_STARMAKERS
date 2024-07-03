import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useLocation } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

const StarPaymentFail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const errorMessage = queryParams.get('errorMessage') || '알 수 없는 이유로 결제가 실패했습니다.';

  const handleRetry = () => {
    // 재시도 로직을 추가하세요. 예를 들어, 결제 페이지로 리다이렉트
    window.location.href = `/retry-payment?orderId=${orderId}`;
  };

  return (
    <MainLayout>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="mt-3 mb-4">결제 실패</h1>
          <Alert variant="danger">
            <Alert.Heading>결제가 실패했습니다.</Alert.Heading>
            <p>{errorMessage}</p>
            <hr />
            <p className="mb-0">주문 ID: {orderId}</p>
          </Alert>
          <Button variant="primary" onClick={handleRetry} className="mt-3">
            다시 시도
          </Button>
          <Button variant="secondary" href="/support" className="mt-3 ml-3">
            고객 지원
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default StarPaymentFail;
