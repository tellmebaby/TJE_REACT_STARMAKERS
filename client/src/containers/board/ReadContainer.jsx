import React, { useEffect, useState } from 'react';
import * as starBoards from '../../apis/starBoard';
import Read from '../../components/board/Read';

const ReadContainer = ({ starNo }) => {
  const [starBoard, setStarBoard] = useState({});
  const [fileList, setFileList] = useState([]);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const getBoard = async () => {
    setLoading(true);
    const response = await starBoards.select(starNo);
    const data = await response.data;
    setStarBoard(data.starBoard);
    setFileList(data.fileList || []);
    setLoading(false);
  };

  const getReplies = async () => {
    const replyList = await starBoards.replyList(starNo);
    setReplies(replyList);
  };

  const handleNewReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const replyData = {
      starNo,
      content: newReply,
      username: 'currentUser', // 현재 로그인된 사용자 이름을 입력하세요
    };
    await starBoards.insertReply(replyData);
    setNewReply("");
    getReplies();
  };

  const handleReplyDelete = async (replyNo) => {
    await starBoards.deleteReply(replyNo);
    getReplies();
  };

  // ❓ hook
  useEffect(() => {
    getBoard();
    getReplies();
  }, [starNo]);

  return (
    <>
      <Read
        starNo={starNo}
        starBoard={starBoard}
        fileList={fileList}
        isLoading={isLoading}
        replies={replies}
        newReply={newReply}
        handleNewReplyChange={handleNewReplyChange}
        handleReplySubmit={handleReplySubmit}
        handleReplyDelete={handleReplyDelete}
      />
    </>
  );
};

export default ReadContainer;
