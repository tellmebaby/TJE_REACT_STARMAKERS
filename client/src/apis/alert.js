import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// 기본 alert
export const alert = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon
    })
    .then(callback);
};

// confirm
export const confirm = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
    })
    .then(callback);
};

// 포인트 충전
export const chargePoints = (navigate, callback) => {
    MySwal.fire({
        title: '포인트 충전',
        html: '<input type="number" id="swal-input1" class="swal2-input" placeholder="충전할 금액">',
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "취소",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "충전",
        preConfirm: () => {
            const amount = document.getElementById('swal-input1').value;
            if (!amount) {
                Swal.showValidationMessage('금액을 입력하세요.');
                return false;
            }
            return { amount };
        },
        customClass: {
            input: 'swal2-input-custom',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Check if callback is a function before invoking it
            if (typeof callback === 'function') {
                callback(result.value); // Pass the charge amount info to the callback function
            }
            navigate('/UserPayment', { state: { amount: result.value.amount } }); 
        }
    });
};

// 포인트 환급
export const refundPoints = (callback) => {
    MySwal.fire({
        title: '포인트 환급',
        html:
            '<input type="number" id="swal-input1" class="swal2-input" placeholder="환급할 금액">' +
            '<select id="swal-input3" class="swal2-select">' +
                '<option value="">은행을 선택하세요</option>' +
                '<option value="국민은행">국민은행</option>' +
                '<option value="기업은행">기업은행</option>' +
                '<option value="농협은행">농협은행</option>' +
                '<option value="농협중앙회">농협중앙회</option>' +
                '<option value="신한은행">신한은행</option>' +
                '<option value="산업은행">산업은행</option>' +
                '<option value="우리은행">우리은행</option>' +
                '<option value="한국씨티은행">한국씨티은행</option>' +
                '<option value="KEB하나은행">KEB하나은행</option>' +
                '<option value="SC제일은행">SC제일은행</option>' +
                '<option value="K뱅크">K뱅크</option>' +
                '<option value="카카오뱅크">카카오뱅크</option>' +
                '<option value="경남은행">경남은행</option>' +
                '<option value="광주은행">광주은행</option>' +
                '<option value="대구은행">대구은행</option>' +
                '<option value="도이치은행">도이치은행</option>' +
                '<option value="BOA은행">BOA은행</option>' +
                '<option value="부산은행">부산은행</option>' +
            '</select>'+
            '<input id="swal-input2" class="swal2-input" placeholder="계좌번호">',
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "취소",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "환급 요청",
        preConfirm: () => {
            const amount = document.getElementById('swal-input1').value;
            const accountNumber = document.getElementById('swal-input2').value;
            const bank = document.getElementById('swal-input3').value;
            if (!amount || !accountNumber || !bank) {
                Swal.showValidationMessage('모든 필드를 입력하세요.');
                return false;
            }
            return { amount, accountNumber, bank };
        },
        customClass: {
            input: 'swal2-input-custom', // 선택 박스 스타일링을 위한 클래스 추가
            select: 'swal2-select-custom' // 선택 박스 스타일링을 위한 클래스 추가
        }
    }).then((result) => {
        if (result.isConfirmed) {
            callback(result.value); // 환급 금액, 계좌번호와 은행 정보를 콜백으로 전달
        }
    });
};
