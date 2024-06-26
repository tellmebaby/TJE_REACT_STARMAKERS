package com.aloha.server.user.dto;


import java.util.Date;

import lombok.Data;

@Data
public class Email {
    private int e_no;
    private String email;
    private String token;
    private String code;
    private Date regDate;
    private String status;    
}
