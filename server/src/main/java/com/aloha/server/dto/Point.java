package com.aloha.server.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Point {
    private int pointNo;
    private int point;
    private int userNo;
    private int starNo;
    private Date regDate;
    private String type;
    private int sendNo;
    private String msg;
    private String code;    
    private int totalPoint;
}
