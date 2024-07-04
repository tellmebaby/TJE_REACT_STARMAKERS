package com.aloha.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {

    public Integer select(@Param("userNo") int userNo, @Param("starNo")int starNo) throws Exception;
    public int save(@Param("userNo") int userNo, @Param("starNo")int starNo) throws Exception;
    public int delete(@Param("userNo") int userNo, @Param("starNo")int starNo) throws Exception;
    public int likeCount(int starNo) throws Exception;
    
} 