package com.aloha.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.dto.Pay;
import com.aloha.server.mapper.PayMapper;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class PayServiceImpl implements PayService {


    @Autowired
    private PayMapper payMapper;

    @Override
    public int insert(Pay pay) {
        payMapper.insert(pay);
        return pay.getPayNo();
    }

    @Override
    public Pay select(int starNo) {
        return payMapper.select(starNo);
    }

    @Override
    public List<Pay> userList(int userNo) {

        List<Pay> payList = payMapper.userList(userNo);
        return payList;
    }

    @Override
    public List<Pay> totalList() {
        return payMapper.totalList();
    }

    @Override
    public int update(Pay pay) {
        return payMapper.update(pay);
    }

    /* 
     * 관리자 회원 결제 조회
     */
    @Override
    public Pay totalPrice(int userNo) throws Exception {

       Pay totalPrice = payMapper.totalPrice(userNo);
       return totalPrice;
        
        
    }

    @Override
    public Pay select_code(String code) {
        return payMapper.select_code(code);
    }
    
}
