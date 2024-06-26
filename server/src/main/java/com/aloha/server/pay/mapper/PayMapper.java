package com.aloha.server.pay.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.pay.dto.Pay;



@Mapper
public interface PayMapper {

    // 결제내역 등록
    public int insert(Pay pay);

    // 결제내역 상세조회
    public Pay select(int payNo);

    //마이페이지 결제내역 리스트
    public List<Pay> userList(int userNo);

    //모든 회원 결제내역 리스트
    public List<Pay> totalList();

    //결제취소때 사용
    public int update(Pay pay);

    // 관리자 회원별 결제금액 조회
    public Pay totalPrice(int userNo) throws Exception;


    
}
