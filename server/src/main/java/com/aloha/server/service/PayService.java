package com.aloha.server.service;

import java.util.List;

import com.aloha.server.dto.Pay;

public interface PayService {
    
     // 결제내역 등록
    public int insert(Pay pay);

    // 결제내역 상세조회
    public Pay select(int statNo);

    //마이페이지 결제내역 리스트
    public List<Pay> userList(int userNo);

    //모든 회원 결제내역 리스트
    public List<Pay> totalList();

    //결제취소때 사용
    public int update(Pay pay);

    // 관리자 회원별 결제조회
    public Pay totalPrice(int userNo) throws Exception;
}
