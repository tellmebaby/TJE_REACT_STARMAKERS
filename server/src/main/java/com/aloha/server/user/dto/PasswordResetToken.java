package com.aloha.server.user.dto;


import lombok.Data;

import java.util.Calendar;
import java.util.Date;


@Data
public class PasswordResetToken {

    private Long id;

    private String token;

    private String email;

    private Date expiryDate;

    public PasswordResetToken() {}

    public PasswordResetToken(String token, String email) {
        this.token = token;
        this.email = email;
        this.expiryDate = calculateExpiryDate(24 * 60); // 24 hours expiration time
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }

    // Getters and setters

    public boolean isExpired() {
        return new Date().after(this.expiryDate);
    }
}

