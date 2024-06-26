package com.aloha.server.pay.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aloha.server.board.dto.StarBoard;
import com.aloha.server.board.service.StarService;
import com.aloha.server.pay.dto.Pay;
import com.aloha.server.pay.service.PayService;
import com.aloha.server.user.dto.Users;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class PayController {

    @Autowired
    private PayService payService;

    @Autowired
    private StarService starService;

    // 테스트 페이지
    // @GetMapping("/payments/checkout")
    // public String checkout() {
    //     return "/page/payments/checkout";
    // }

    @GetMapping("/payments/success")
    public String showSuccessPage() {
        return "/page/payments/success";
    }

    @PostMapping("/payments/success")
    public ResponseEntity<Map<String, Object>> paymentSuccess(Pay pay) throws Exception {

        pay.setProductTitle("홍보카드 기간제 상품");
        pay.setStatus("결제완료");

        int payNo = payService.insert(pay);


        // 스타보드 상태 결제완료로 바꿔주기
        StarBoard starBoard = starService.select(pay.getStarNo());
        starBoard.setStatus("홍보요청");
        int update = starService.update(starBoard);

        Map<String, Object> response = new HashMap<>();

        if(payNo>0) response.put("status", "success");
        else response.put("status", "fail");
        
        // response.put("payNo", payNo);
        response.put("starNo", pay.getStarNo());

        return ResponseEntity.ok(response);
    }

    // 결제완료 페이지
    @GetMapping("/payments/paySuccess")
    public String paySuccess(@RequestParam("starNo") int starNo, Model model, HttpSession session) throws Exception {
        Users user = (Users) session.getAttribute("user");
        if (user != null) {
            model.addAttribute("user", user);
        }

        StarBoard starBoard = starService.select(starNo);
        model.addAttribute("starBoard", starBoard);

        Pay pay = payService.select(starNo);
        model.addAttribute("pay", pay);

        return "/page/payments/paySuccess";
    }


    @GetMapping("/payments/payFail")
    public String getMethodName() {
        return "/page/payments/payFail";
    }
    
}
