package com.aloha.server.message.dto;


import java.util.Date;

import lombok.Data;

@Data
public class Message {

    private int messageNo;
    private String content;
    private String code;
    private Date regDate;
    private int replyNo;
    private int payNo;
    private int qnaNo;
    private int userNo;
    private int view;
    private String name;
    private int imgNo;
    private int count;
}
