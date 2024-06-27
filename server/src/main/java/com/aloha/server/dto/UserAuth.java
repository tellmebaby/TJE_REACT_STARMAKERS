package com.aloha.server.dto;

import lombok.Data;

@Data
public class UserAuth {
    private String authNo;
    private String userId;      // ✅ 아이디(이메일)
    private String auth;

    public UserAuth() {

    }

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }

}