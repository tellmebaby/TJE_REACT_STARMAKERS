package com.aloha.server.controller;

import java.util.HashMap;
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

import com.aloha.server.dto.StarBoard;
import com.aloha.server.service.StarService;
import com.aloha.server.dto.Pay;
import com.aloha.server.service.PayService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/pay")
@RestController
public class PayController {

    @Autowired
    private PayService payService;

    @Autowired
    private StarService starService;

    @GetMapping("/payments/success")
    public String showSuccessPage() {
        return "/page/payments/success";
    }


    // 결제완료요청
    @PostMapping("/success")
    public ResponseEntity<Map<String, Object>> paymentSuccess(@RequestBody Pay pay) throws Exception {

        pay.setProductTitle("홍보카드 기간제 상품");
        pay.setStatus("결제완료");

        int payNo = payService.insert(pay);

        // 스타보드 상태 결제완료로 바꿔주기
        StarBoard starBoard = starService.select(pay.getStarNo());
        starBoard.setStatus("홍보요청");
        starService.update(starBoard);

        Map<String, Object> response = new HashMap<>();

        if (payNo > 0)
            response.put("status", "success");
        else
            response.put("status", "fail");

        // response.put("payNo", payNo);
        response.put("starNo", pay.getStarNo());

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


}
