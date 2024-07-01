package com.aloha.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Option;
import com.aloha.server.dto.Page;
import com.aloha.server.dto.StarBoard;
import com.aloha.server.mapper.LikeMapper;
import com.aloha.server.mapper.StarMapper;
import com.aloha.server.dto.Users;
import com.aloha.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StarServiceImpl implements StarService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private StarMapper starMapper;

    @Autowired
    private LikeMapper likeMapper;

    /**
     * 게시글 목록
     */
    @Override
    public List<StarBoard> list(String type, Page page, Option option) throws Exception {
        int total = starMapper.count(option, type);
        page.setTotal(total);
        log.info(page.toString());
        log.info(option.toString());
        // log.info(":::여기는 서비스 옵션값을 볼까? " + option.getKeyword());
        List<StarBoard> starList = starMapper.list(type, page, option);
        if (starList != null && !starList.isEmpty()) {
            for (StarBoard starBoard : starList) {
                log.info("글 목록 : " + starBoard.toString());
            }
        } else {
            log.info("게시판 조회가 안 됩니다..");
        }
        return starList;
    }

    /**
     * 글 등록(무료)
     */
    @Override
    public StarBoard insert(StarBoard starBoard) throws Exception {
        int result = starMapper.insert(starBoard);
        log.info("result : " + result);
        int newNo = starBoard.getStarNo();
        StarBoard newBoard = starMapper.select(newNo);

        // 파일 업로드

        // starBoard.setUserNo(user.getUserNo());
        // if (user.getId() == null || user.getId().equals("")) {
        // starBoard.setWriter(user.getName());
        // }else{
        // starBoard.setWriter(user.getId());
        // }

        return newBoard;
    }

    /**
     * 글 등록(유료)
     * 결제버튼 눌렀을 때 이거로 실행
     */
    @Override
    public int payInsert(StarBoard starBoard, String username) throws Exception {
        Users user = userMapper.login(username);
        starBoard.setUserNo(user.getUserNo());
        if (user.getId() == null || user.getId().equals("")) {
            starBoard.setWriter(user.getName());
        } else {
            starBoard.setWriter(user.getId());
        }
        starBoard.setCard("유료홍보요청");
        // Date strDate = starBoard.getStartDate();
        // Date endDate = starBoard.getEndDate();

        // 정보 등록
        int result = starMapper.insert(starBoard);

        return result;
    }

    /**
     * 글 조회
     */
    @Override
    public StarBoard select(int starNo) throws Exception {
        StarBoard starBoard = starMapper.select(starNo);

        return starBoard;
    }

    @Override
    public StarBoard select(int starNo, int userNo) throws Exception {
        StarBoard starBoard = starMapper.readUserBoard(starNo, userNo);
        return starBoard;
    }

    @Override
    public int update(StarBoard starBoard) throws Exception {
        int result = starMapper.update(starBoard);
        return result;
    }

    /**
     * 조회수 증가
     */
    @Override
    public int views(int starNo) throws Exception {
        log.info(starNo + "번 게시글 조회수 증가");
        return starMapper.views(starNo);
    }

    /**
     * 글 삭제
     */
    @Override
    public int delete(String starNoList) throws Exception {
        int result = starMapper.delete(starNoList);
        return result;

    }

    /**
     * 글 목록 조회(list)
     */
    @Override
    public List<StarBoard> list(String type, Page page, Option option, int userNo) throws Exception {
        int total = starMapper.count(option, type);
        page.setTotal(total);
        List<StarBoard> starList = starMapper.list(type, page, option);

        if ("starCard".equals(type)) {
            starList.forEach(star -> {
                try {
                    int statNo = star.getStarNo();
                    if (likeMapper.select(userNo, statNo) != null) {
                        star.setLikes_chk(1);
                    }
                } catch (Exception e) {
                    e.printStackTrace(); // 예외 처리
                }
            });
        }
        return starList;
    }

    /**
     * 새 메인 카드리스트 요청
     */
    @Override
    public List<StarBoard> mainCardList(String type) throws Exception {
        List<StarBoard> starList = starMapper.mainCardList(type);
        return starList;
    }

    @Override
    public List<StarBoard> getMainCardListForLoggedInUser(int userNo, String type) throws Exception {
        log.info("유저번호 받아왔나 여기는 서비스 : " + userNo);
        List<StarBoard> starList = starMapper.getMainCardListForLoggedInUser(userNo, type);
        return starList;
    }

    @Override
    public List<StarBoard> promotionList(int userNo, Page page, Option option) throws Exception {

        List<StarBoard> promotionList = starMapper.promotionList(userNo, page, option);
        log.info("userNo : " + userNo);
        return promotionList;
    }

    @Override
    public int approve(String starNoList) throws Exception {
        int result = starMapper.approve(starNoList);
        return result;
    }

    @Override
    public int companion(String starNoList) throws Exception {
        int result = starMapper.companion(starNoList);
        return result;
    }

    @Override
    public List<StarBoard> adminStarCard(String type, Page page, Option option, int status) throws Exception {
        int total = starMapper.count(option, type);
        page.setTotal(total);
        List<StarBoard> starList = starMapper.adminStarCard(type, page, option, status);
        return starList;
    }

    @Override
    public List<StarBoard> countList() throws Exception {

        List<StarBoard> starList = starMapper.countList();
        return starList;
    }

    /**
     * myPage 내 보관함 카드목록
     */
    @Override
    public List<StarBoard> getStarCardsByUserNo(int userNo) throws Exception {
        return starMapper.getStarCardsByUserNo(userNo);
    }

    @Override
    // 목록조회 getStarList
    public List<StarBoard> getStarList(String type, Page page, Option option, int userNo) throws Exception {
        int total = starMapper.count(option, type);
        page.setTotal(total);
        return starMapper.getStarList(type, page, option, userNo);
    }

    // get Banner
    // 메인 배너 가져오기
    public List<StarBoard> getBanner() throws Exception{
        return starMapper.getBanner();
    }

    // 메인 게시물조각 가져오기
    public List<StarBoard> getFragByType(String type) throws Exception{
        return starMapper.getFragByType(type);
    }
}
