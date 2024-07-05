package com.aloha.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.dto.Pay;
import com.aloha.server.dto.Point;
import com.aloha.server.dto.StarBoard;
import com.aloha.server.service.PayService;
import com.aloha.server.service.PointService;
import com.aloha.server.service.StarService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/pay")
@RestController
public class PayController {

    @Autowired
    private PayService payService;

    @Autowired
    private StarService starService;

    @Autowired
    private PointService pointService;

    @GetMapping("/payments/success")
    public String showSuccessPage() {
        return "/page/payments/success";
    }


    // 결제완료요청
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> paymentSuccess(@RequestBody Pay pay) throws Exception {

        Map<String, Object> response = new HashMap<>();

        String code = pay.getCode();
        Pay chk = payService.select_code(code);

        log.info("code :" + chk);
        
        // 중복결제시도
        if(chk!=null){
            response.put("status", "success");
            response.put("msg", "결제완료상태");
            response.put("pay", chk);
            return ResponseEntity.ok(response);
        }

        pay.setProductTitle("홍보카드 기간제 상품");
        pay.setStatus("결제완료");

        int payNo = payService.insert(pay);

        // 스타보드 상태 결제완료로 바꿔주기
        StarBoard starBoard = starService.select(pay.getStarNo());
        starBoard.setStatus("홍보요청");
        starService.update(starBoard);

        

        if (payNo > 0)
            response.put("status", "success");
        else
            response.put("status", "fail");

        pay.setPayNo(payNo);
        response.put("pay", pay);

        return ResponseEntity.ok(response);
    }

    // 결제정보 조회
    @GetMapping("/{no}")
    public ResponseEntity<?> select(@PathVariable("no") int starNo) throws Exception {
        try {
            Pay pay = payService.select(starNo);
            return new ResponseEntity<>(pay, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/point")
    public ResponseEntity<?> pointAdd(@RequestBody Point point) {

        String type = point.getType();

        if(type!="충전"){

        }

        try {
            int result = pointService.insert(point);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @GetMapping("/point/{no}")
    public ResponseEntity<?> pointList(@PathVariable("no") int userNo) throws Exception {
        try {
            List<Point> poinyList = pointService.list(userNo);
            return new ResponseEntity<>(poinyList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    

    


}
