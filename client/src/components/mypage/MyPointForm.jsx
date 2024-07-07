import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { chargePoints, refundPoints } from "../../apis/alert"; // 적절한 경로로 수정
import * as pay from "../../apis/pay";
import styles from "./css/PaymentForm.module.css";
import Menu from "./Menu";

const MyPointForm = ({ pointList, userInfo, userPointList }) => {
  const navigate = useNavigate();

  const [visibleItems, setVisibleItems] = useState(4);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleCharge = () => {
    chargePoints(navigate, (chargeInfo) => {
      // console.log('Charged Amount:', chargeInfo.amount);
    });
  };

  // 포인트 환급
  async function pointAdd_3(points) {
    if (userInfo.point < points.amount) {
      alert("포인트가 부족합니다.");
      return false;
    }

    const requestData = {
      point: -points.amount,
      type: "환급",
      userNo: userInfo.userNo,
      msg: `[${points.bank}]${points.accountNumber}으로 ${points.amount}원을 환급하였습니다.`,
    };

    try {
      const response = await pay.pointAdd(requestData);

      if (response.status !== 200) {
        alert("다시시도해주세요");
        return false;
      } else {
        userInfo.point = userInfo.point - points.amount;
        userPointList();
        return true;
      }
    } catch (error) {
      console.error("결제 확인 중 에러 발생:", error);
      //   navigate(`/payments/fail`);
    }
  }

  const handleRefund = () => {
    refundPoints((points) => {
      pointAdd_3(points);
    });
  };

  const handleMoveToPost = (starNo) => {
    window.location.href = `/${starNo}`;
  };

  const getButtonClassName = (type) => {
    switch (type) {
      case "충전":
        return `${styles.button} ${styles.chargeBtn}`;
      case "환급":
        return `${styles.button} ${styles.refundBtn}`;
      case "사용":
        return `${styles.button} ${styles.useBtn}`;
      case "후원":
        return `${styles.button} ${styles.donateBtn}`;
      default:
        return styles.button;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Menu styles={styles} />

        <div className="col-md-9">
          <div className={styles.list}>
            <h2 style={{ color: "#000" }}>포인트 관리</h2>
            <li>포인트 충전 및 사용 내역을 확인하실 수 있습니다.</li>
            {/* <li>홍보글이 승인된 경우, 관리자 확인 후 일부 금액만 환불 가능 또는 환불 불가할 수 있습니다.</li> */}
            <div className={styles.buttonContainer}>
              <button className={styles.chargeButton} onClick={handleCharge}>
                충전
              </button>
              <button className={styles.refundButton} onClick={handleRefund}>
                환급
              </button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>사용일자</th>
                  <th>구분</th>
                  <th>내역</th>
                  <th>포인트</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody id="payment-list">
                {pointList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      align="center"
                      style={{
                        paddingTop: "183.49px",
                        paddingBottom: "183.49px",
                      }}
                    >
                      조회된 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  pointList.slice(0, visibleItems).map((point) => (
                    <React.Fragment key={point.code}>
                      <tr key={`${point.code}-row1`}>
                        <td className="border-0 pt-4">
                          {new Date(point.regDate).toLocaleDateString()}
                        </td>

                        <td className="border-0 pt-4">
                          <span className={getButtonClassName(point.type)}>
                            {point.type}
                          </span>
                        </td>

                        <td className="border-0 pt-4">{point.msg}</td>
                        <td className="border-0 pt-4">
                          <span>{point.point.toLocaleString()}원</span>
                        </td>
                        <td className="border-0 pt-4">
                          {point.starNo > 0 && (
                            <button
                              className={styles.moveButton}
                              onClick={() => handleMoveToPost(point.starNo)}
                            >
                              게시물로 이동
                            </button>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
            {visibleItems < pointList.length && (
              <div className={styles.loadMoreBtn}>
                <button type="button" onClick={loadMore}>
                  더보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPointForm;
