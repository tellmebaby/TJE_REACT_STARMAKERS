package com.aloha.server.pay.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Pay {
    private int payNo;
    private String code;
    private int price;
    private int userNo;
    private String productTitle;
    private int starNo;
    private Date regDate;
    private String status;
    private String starStatus;
    private int totalPrice;
}
