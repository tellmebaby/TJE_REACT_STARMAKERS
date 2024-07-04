package com.aloha.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.StarBoard;
import com.aloha.server.mapper.LikeMapper;
import com.aloha.server.mapper.StarMapper;

import lombok.extern.slf4j.Slf4j;



@Slf4j
@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeMapper likeMapper;

    @Autowired
    private StarMapper starMapper;

    
    @Override
    public boolean toggleLike(int userNo, int starNo) throws Exception {

        Integer like = likeMapper.select(userNo, starNo);

        StarBoard starBoard = starMapper.select(starNo);
        int likes = starBoard.getLikes();

        int chk =0;
        if (like == null) {
            likeMapper.save(userNo, starNo);
            likes++;
            chk =1;
        } else {
            likeMapper.delete(userNo, starNo);
            likes--;
        }

        starBoard.setLikes(likes);
        int result = starMapper.update(starBoard);
        if( result > 0 ){
            // log.info("업데이트 성공");
        }


        if(chk>0){
            return true;
        }

        return false;
    }

    // 좋아요 확인
    @Override
    public int checkLiked(int userNo, int starNo) throws Exception {
        Integer like = likeMapper.select(userNo, starNo);
        return like != null ? like.intValue() : 0;
    }
    
}
