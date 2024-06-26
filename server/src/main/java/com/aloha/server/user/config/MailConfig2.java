package com.aloha.server.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig2 {

    // @Bean
    // public JavaMailSender javaMailSender() {
    //     JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    //     mailSender.setHost("smtp.gmail.com");
    //     mailSender.setPort(587);
        
    //     mailSender.setUsername("noreplystarmakers@gmail.com");
    //     mailSender.setPassword("star!makers1");
        
    //     Properties props = mailSender.getJavaMailProperties();
    //     props.put("mail.transport.protocol", "smtp");
    //     props.put("mail.smtp.auth", "true");
    //     props.put("mail.smtp.starttls.enable", "true");
    //     props.put("mail.smtp.starttls.required", "true");
    //     props.put("mail.debug", "true");
        
    //     return mailSender;
    // }
}


