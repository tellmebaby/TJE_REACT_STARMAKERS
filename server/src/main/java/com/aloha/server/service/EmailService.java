package com.aloha.server.service;

import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Email;
import com.aloha.server.mapper.EmailMapper;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private EmailMapper emailMapper;

    private Map<String, String> emailTokens = new ConcurrentHashMap<>();

    public void sendVerificationEmail(String toEmail) throws MessagingException {
        String token = UUID.randomUUID().toString();
        emailTokens.put(toEmail, token);

        String htmlBody = "<a href=\"http://192.168.30.231:8080/verify?token=" + token + "\">인증하기</a>";

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(toEmail);
        helper.setSubject("이메일 인증");
        helper.setText(htmlBody, true);  // true indicates HTML

        emailSender.send(message);

        String code = generateRandomNumber(6);

        Email email = new Email();
        email.setEmail(toEmail);
        email.setToken(token);
        email.setCode(code);

        emailMapper.save(email);        
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
