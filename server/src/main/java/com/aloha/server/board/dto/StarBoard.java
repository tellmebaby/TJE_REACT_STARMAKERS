package com.aloha.server.board.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class StarBoard {
    private int starNo;
    private String title;
    private String writer;
    private String content;
    private Date regDate;
    private Date updDate;
    private int views;
    private int userNo;
    private int payNo;
    private int likes;
    private String status;  // 홍보요청 / 홍보중 / 홍보종료 / 반려
    private String card;
    private String category1; // 채널(인스타, 유튜브, 치지직 등)
    private String category2; // 분야(음식, 여행, 게임 등)
    private String type; // 유료 / 무료 / 디자인의뢰
    private Date startDate;
    private Date endDate;
    private int imgNo;
    private List Icons;
    private int commentCount;
    private int likes_chk;

    private int userImgId;

    private int starPrice;

    private String action;
}

