package com.aloha.server.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.dto.PasswordResetToken;

@Mapper
public interface PasswordResetTokenMapper {
 
    public int save(PasswordResetToken token);

    public PasswordResetToken findByToken(String token);

    public int deleteByToken(String token);
}
