package com.aloha.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.aloha.server.dto.Email;

@Mapper
public interface EmailMapper {

    // 토큰값 저장
    public int save(Email email);

    // 토큰값 조회
    public Email select(String token);

    // 토큰 상태 변경
    public int update(Email email);


    // 토큰인증
    @Update("UPDATE email SET status = '인증완료' WHERE code = #{code} AND email = #{email}")
    public boolean verifyCode(@Param("code")String code, @Param("email")String email);


}
