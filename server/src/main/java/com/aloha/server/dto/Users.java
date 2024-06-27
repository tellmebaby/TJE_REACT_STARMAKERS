package com.aloha.server.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Users {
    private int userNo;
    private String name;
    private String id;
    private String email;
    private String password;
    private String confirmPassword;
    private String phone;
    private String address;
    private Date regDate;
    private Date updDate;
    private int enabled;
    private String gender;
    private String birth;
    private String address_detail;
    private String sociaCode;

    private int userImgId;

    private int imgNo;

    // 권한 목록
    private List<UserAuth> authList;

    // 권한 
    private String auth;
    private boolean isBlack;
}
