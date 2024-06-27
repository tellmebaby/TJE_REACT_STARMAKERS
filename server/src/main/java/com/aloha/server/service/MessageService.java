package com.aloha.server.service;

import java.util.List;

import com.aloha.server.dto.Message;

public interface MessageService {

    // Create
    public int insertMessage(Message messageDTO);

    // Read
    public Message getMessageById(int messageNo);

    // LIST - 댓글알림
    public List<Message> getMessageByReply(int replyNo);

    // LIST - 결제알림
    public List<Message> getMessageByPay(int payNo);

    // LIST - 질의응답알림
    public List<Message> getMessageByQna(int qnaNo);

    // LIST - 생성자로조회
    public List<Message> getMessageByUser(int userNo);

    // Update
    public int updateMessage(Message messageDTO);

    // Delete
    public int deleteMessage(int messageNo);

    // 1ㄷ1 채팅리스트
    public List<Message> getMessagesList();

    public int updateView(int userNo, String to);
     // 대화종료
     public int updateMessageByUser(int userNo);

     // 1:1 대화 받아오기
    public List<Message> getChatMessageByUser(int userNo);


}
