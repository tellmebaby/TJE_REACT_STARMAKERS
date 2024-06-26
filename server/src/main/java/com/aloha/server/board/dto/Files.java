package com.aloha.server.board.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Files {
    private int fileNo;
    private String fileName;
    private String originName;
    private long size;
    private Date regDate;
    private int userNo;
    private int StarNo;
    private MultipartFile file;
}