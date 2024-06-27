package com.aloha.server.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.server.board.dto.Reply;
import com.aloha.server.board.mapper.ReplyMapper;
import com.aloha.server.user.dto.Users;
import com.aloha.server.user.mapper.UserMapper;

@Service
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Reply> list() throws Exception {
        List<Reply> replyList = replyMapper.list();
        return replyList;
    }

    @Override
    public List<Reply> listByStarNo(int starNo) throws Exception {
        List<Reply> replyList = replyMapper.listByStarNo(starNo);
       return replyList;
    }

    @Override
    public Reply select(int replyNo) throws Exception {
        Reply reply = replyMapper.select(replyNo);
        return reply;
    }

    @Override
    public int insert(Reply reply, String userId) throws Exception {

        // Users user = userMapper.login(userId);
        // reply.setUserNo(user.getUserNo());
        int result = replyMapper.insert(reply);
        int parentNo = reply.getParentNo();

        // 댓글 등록
        // - 댓글 번호(reply_no)와 부모 번호(parent_no) 를 똑같이 수정
        if(result > 0 && parentNo == 0) {
            int replyNo = replyMapper.max();
            reply.setReplyNo(replyNo);
            reply.setParentNo(replyNo);
            replyMapper.update(reply);
        }
        // 부모 번호 지정되어 답글 등록
        return result;
    }

    @Override
    public int update(Reply reply) throws Exception {
        int result = replyMapper.update(reply);
        return result;
    }

    @Override
    public int delete(int replyNo) throws Exception {
        int result = replyMapper.delete(replyNo);

        if(result > 0) {
            result += deleteByParentNo(replyNo);
        }
        return result;
    }

    @Override
    public int deleteByStarNo(int starNo) throws Exception {
        int result = replyMapper.deleteByStarNo(starNo);
       return result;
    }

    @Override
    public int max() throws Exception {
        int result = replyMapper.max();
        return result;
    }

    @Override
    public int deleteByParentNo(int parentNo) throws Exception {
        int result = replyMapper.deleteByParentNo(parentNo);
        return result;
    }

    @Override
    public int countByStarNo(int starNo) throws Exception {

        int result = replyMapper.countByStarNo(starNo);
        return result;
    }

    @Override
    public List<Reply>  selectUser(int userNo) throws Exception {
        List<Reply>  reply = replyMapper.selectUser(userNo);
        return reply;
    }
    
}
