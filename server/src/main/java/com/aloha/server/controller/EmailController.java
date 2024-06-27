package com.aloha.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aloha.server.dto.Email;
import com.aloha.server.service.EmailService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class EmailController {

    @Autowired
    private EmailService emailService;

    @ResponseBody
    @PostMapping("/sendVerificationEmail")
    public String sendVerificationEmail(@RequestParam String email) {
        emailService.sendVerificationEmail(email);
        return "인증 이메일이 발송되었습니다.";
    }

    @GetMapping("/verify")
    public String verifyEmail(@RequestParam String token, Model model) {
        Email email = emailService.select(token);

        if (emailService.verifyToken(token)) {
            email.setStatus("인증완료");
            int result = emailService.update(email);

            model.addAttribute("email", email);

            return "page/login/success";
        } else {
            email.setStatus("인증실패");

        }
        int result = emailService.update(email);
        if (result > 0) {

        }

        return "page/login/failure";
    }

    @PostMapping("/verifyEmail")
    @ResponseBody
    public boolean verifyEmail(String code, String email) {
        return emailService.verifyCode(code,email);
    }

}
