package com.aloha.server.user.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.user.dto.PasswordResetToken;

@Mapper
public interface PasswordResetTokenMapper {
 
    public int save(PasswordResetToken token);

    public PasswordResetToken findByToken(String token);

    public int deleteByToken(String token);
}
