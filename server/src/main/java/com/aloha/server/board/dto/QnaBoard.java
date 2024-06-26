package com.aloha.server.board.dto;

import java.util.Date;

import lombok.Data;

@Data
public class QnaBoard {
    private int qnaNo;
    private int qnaNos;
    private String title;
    private String writer;
    private String username;

    private String content;
    private String answer;
    private Date regDate;
    private Date updDate;
    private int views;
    private int userNo;
    private String status;  // 답변 대기 / 답변 완료
    
}