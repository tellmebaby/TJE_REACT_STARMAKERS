import React from 'react';
import { chargePoints, refundPoints } from '../../apis/alert'; // 적절한 경로로 수정
import styles from './css/PaymentForm.module.css';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';

const MyPointForm = ({userPayList}) => {
    const navigate = useNavigate();

    const handleCharge = () => {
        chargePoints(navigate, (chargeInfo) => {
            console.log('Charged Amount:', chargeInfo.amount);
            // Additional logic after charging points
        });
    };

    const handleRefund = () => {
        refundPoints((points) => {
            console.log(`환급할 포인트: ${points}`);
            // 포인트 환급 로직 추가
        });
    };


    return (
        <div className="container">
            <div className="row">
                <Menu styles={styles}/>

                <div className="col-md-9">
                    <div className={styles.list}>
                        <h2 style={{ color: '#000' }}>포인트 관리</h2>
                        <li>포인트 충전 및 사용 내역을 확인하실 수 있습니다.</li>
                        {/* <li>홍보글이 승인된 경우, 관리자 확인 후 일부 금액만 환불 가능 또는 환불 불가할 수 있습니다.</li> */}
                        <button onClick={handleCharge}>충전</button>
                        <button onClick={handleRefund}>환급</button>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>사용일자</th>
                                    <th>내역</th>
                                    <th>포인트</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody id="payment-list">
                                {userPayList.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" align="center" style={{ paddingTop: '183.49px', paddingBottom: '183.49px' }}>
                                            조회된 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    userPayList.map((payment) => (
                                        <React.Fragment key={payment.code}>
                                            <tr key={`${payment.code}-row1`}>
                                                <td className="border-0 pt-4">{payment.code}</td>
                                                <td className="border-0 pt-4">{payment.productTitle}</td>
                                                <td className="border-0 pt-4">
                                                    <span>{payment.price.toLocaleString()}원</span>
                                                </td>
                                                <td className="border-0 pt-4">{new Date(payment.regDate).toLocaleDateString()}</td>
                                            </tr>
                                            <tr key={`${payment.code}-row2`}>
                                                <td colSpan="3"></td>
                                                <td>
                                                    <div className={styles.buttonContainer}>
                                                        <input
                                                            type="button"
                                                            className={`${styles.btnReview} ${payment.status === '결제완료' ? styles.approved : styles.pending}`}
                                                            value={payment.status}
                                                            disabled
                                                        />
                                                        <button className={styles.btnRefund}>환불요청</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {/* {visibleItems < userPayList.length && (
                            <div className={styles.loadMoreBtn}>
                                <button type="button" onClick={loadMore}>더보기</button>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPointForm