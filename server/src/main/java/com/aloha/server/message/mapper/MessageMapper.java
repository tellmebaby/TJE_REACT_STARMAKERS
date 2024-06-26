package com.aloha.server.message.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.aloha.server.message.dto.Message;

@Mapper
public interface MessageMapper {

    // CREATE
    public int insertMessage(Message message);

    // READ
    public Message getMessageById(int messageNo);

    // LIST - 댓글알림
    public List<Message> getMessageByReply(int replyNo);

    // LIST - 결제알림
    public List<Message> getMessageByPay(int payNo);

    // LIST - 질의응답알림
    public List<Message> getMessageByQna(int qnaNo);

    // LIST - 생성자로조회
    public List<Message> getMessageByUser(int userNo);

    // UPDATE
    public int updateMessage(Message message);

    // DELETE
    public int deleteMessage(int messageNo);

    // 1대1 채팅리스트
    public List<Message> getMessagesList();

    @Update("UPDATE message SET view = 0 WHERE user_no = #{userNo} AND code = #{to}")
    int updateView(@Param("userNo") int userNo, @Param("to") String to);
    // 대화종료
    public int updateMessageByUser(int userNo);

    // 1:1 대화 받아오기
    public List<Message> getChatMessageByUser(int userNo);
}
