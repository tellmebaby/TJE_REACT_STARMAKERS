package com.aloha.server.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Reply {
    private int replyNo;
    private String writer;
    private String username;
    private String content;
    private Date regDate;
    private Date updDate;
    private int userNo;
    private int starNo;
    private int reviewNo;
    private int preNo;
    private int parentNo;
}
