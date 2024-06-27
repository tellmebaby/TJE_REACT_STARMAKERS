package com.aloha.server.service;

import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Email;
import com.aloha.server.mapper.EmailMapper;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailMapper emailMapper;

    // 임시로 토큰 저장 (실제로는 DB에 저장해야 합니다)
    private Map<String, String> emailTokens = new ConcurrentHashMap<>();

    public void sendVerificationEmail(String toEmail) {
        String token = UUID.randomUUID().toString();
        emailTokens.put(toEmail, token);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("이메일 인증");
        message.setText("인증 링크: http://192.168.30.137:8080/verify?token=" + token);

        emailSender.send(message);

        String code = generateRandomNumber(6);

        Email email = new Email();
        email.setEmail(toEmail);
        email.setToken(token);
        email.setCode(code);

        int result = emailMapper.save(email);
        if (result > 1) {
        }
    }

    public String generateRandomNumber(int length) {
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10)); // 0부터 9까지의 숫자
        }
        return sb.toString();
    }

    public boolean verifyToken(String token) {
        return emailTokens.containsValue(token);
    }

    public int save(Email email){
        return emailMapper.save(email);
    }

    public Email select(String token){
        return emailMapper.select(token);
    }

    public int update(Email email){
        return emailMapper.update(email);
    }

    public boolean verifyCode(String code, String email){
        return emailMapper.verifyCode(code,email);
    }
}
