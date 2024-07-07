package com.aloha.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Point;
import com.aloha.server.dto.Users;
import com.aloha.server.mapper.PointMapper;
import com.aloha.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PointServiceImpl implements PointService {

    @Autowired
    PointMapper pointMapper;

    @Autowired
    UserMapper userMapper;

    @Override
    public List<Point> list(int userNo) throws Exception {
        return pointMapper.list(userNo);
    }

    @Override
    public int selectBoard(int starNo) throws Exception {
        return pointMapper.selectBoard(starNo);
    }

    // @Override
    // public int insert(Point point) throws Exception {
    // String code = point.getCode();
    // int sendUserNo = point.getSendNo();
    // int point_ = point.getPoint();

    // // 포인트충전
    // if(code != null){
    // point.setType("충전");
    // point.setMsg(point_+"포인트를 충전하였습니다.");
    // }else if(sendUserNo>0){
    // point.setType("후원");
    // Users sendUser = userMapper.selectUserNo(sendUserNo);
    // log.info(sendUser.toString());
    // point.setMsg(sendUser.getId()+"님이 "+ point_+"포인트를 후원하였습니다.");
    // }else if(point_<0){
    // point.setType("사용");
    // point.setMsg(point_+"포인트가 후원되었습니다.");
    // }

    // int result = pointMapper.insert(point);

    // if(result>0){
    // int totalPoint = pointMapper.sum(point.getUserNo());
    // Users user = new Users();
    // user.setUserNo(point.getUserNo());
    // user.setPoint(totalPoint);
    // userMapper.update(user);
    // }

    // return result;
    // }

    public int insert(Point point) throws Exception {
        String code = point.getCode();
        int sendUserNo = point.getSendNo();
        int point_ = point.getPoint();

        log.info("A포인트");

        // 포인트 충전
        if (code != null) {
            point.setType("충전");
            point.setMsg(point_ + "포인트를 충전하였습니다.");

            log.info("B포인트");
        } else if (sendUserNo > 0) {
            try {
                Users sendUser = userMapper.selectUserNo(sendUserNo);
                if (sendUser != null) {
                    point.setType("후원");
                    point.setMsg(sendUser.getId() + "님이 " + point_ + "포인트를 후원하였습니다.");
                } else {
                    throw new Exception("후원자 정보를 찾을 수 없습니다.");
                }
            } catch (Exception e) {
                log.error("후원자 정보 조회 중 오류 발생", e);
                throw new Exception("후원자 정보 조회 중 오류 발생: " + e.getMessage());
            }
        } else if (point_ < 0) {
            point_ *= -1;
            if (point.getType() == "사용") {
                point.setMsg(point_ + "포인트가 사용되었습니다.");
            }
        } else {
            throw new IllegalArgumentException("유효하지 않은 포인트 정보입니다.");
        }

        int result = pointMapper.insert(point);
        log.info("D포인트");

        if (result > 0) {
            log.info("E포인트");
            int totalPoint = pointMapper.sum(point.getUserNo());

            Users user = userMapper.selectUserNo(point.getUserNo());
            user.setPoint(totalPoint);

            log.info(user.toString());

            userMapper.update(user);
            log.info("F포인트");
        }

        return result;
    }

}
