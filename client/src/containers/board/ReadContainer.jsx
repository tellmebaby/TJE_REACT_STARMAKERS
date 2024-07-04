import React, { useContext, useEffect, useState } from 'react';
import * as starBoards from '../../apis/starBoard';
import Read from '../../components/board/Read';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';

const ReadContainer = ({ starNo }) => {
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  const [starBoard, setStarBoard] = useState({});
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [answerContent, setAnswerContent] = useState('');
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🌞 함수
  const getBoard = async () => {
    setLoading(true);
    const response = await starBoards.select(starNo);
    const data = await response.data;
    setStarBoard(data.starBoard);
    setFileList(data.fileList || []);
    setLoading(false);
  };

  const getReplyList = async () => {
    const response = await starBoards.replyList(starNo);
    const data = response.data;
    console.log("댓글 데이터");
    console.log(data);
    setReplyList(data.replyList);
  };

    
  const onDelete = async (starNo) => {
    const response = await starBoards.remove(starNo)
    const status = await response.status
    console.log(`게시글 삭제 요청 결과 : ${status}`)
    alert("삭제 완료!")

    // -> 목록으로 이동
    navigate(`/${starBoard.type}`)
}

 // 댓글--------------------------------------------댓글
  const handleReplySubmit = async (e) => {
    // e.preventDefault();
  
  
    try {
      const replyData = {
        starNo,
        content: newReply,
        userNo: userInfo.userNo,
        writer: userInfo.id
        
        // username: "?"
      };
      console.log("아이디 제발 : ",userInfo.id)
      
      if (newReply.trim() === "") {
        alert("댓글을 입력하세요.");
        return;
      }
  
      console.log("replyData");
      console.log(replyData);
      
      const response = await starBoards.insertReply(replyData);
      // const data = await response.data
      console.log("데이터 가져와");
      // console.log(data);
      console.log("Reply submission response:", response.data);
      setNewReply("");
      console.log("new리플", newReply)
      getReplyList();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

 // 답글--------------------------------------------답글
  const handleRereplySubmit = async (showAnswerBox, answerContent) => {
    // e.preventDefault();
  
  
    try {
      const replyData = {
        starNo,
        content: answerContent,
        userNo: userInfo.userNo,
        writer: userInfo.id,
        parentNo:showAnswerBox
        // username: "?"
      };
      console.log("답글 아이디 제발 : ",userInfo.id)
      
      if (answerContent.trim() === "") {
        alert("댓글을 입력하세요.");
        return;
      }
  
      console.log("replyData");
      console.log(replyData);
      
      const response = await starBoards.insertReply(replyData);
      // const data = await response.data
      console.log("데이터 가져와");
      // console.log(data);
      console.log("Rereply submission response:", response.data);
      setAnswerContent("");
      console.log("new리리플", answerContent)
      getReplyList();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };


  const handleReplyDelete = async (replyNo) => {
    await starBoards.deleteReply(replyNo);
    window.confirm("삭제하시겠습니까?")
    getReplyList();
  };

  const handleReplyUpdate = async (replyNo, content) => {
    try {
      const writer = userInfo.id
      const response = await starBoards.updateReply({ replyNo, writer, content });
      console.log("수정 될거야 말거야", response.data);
      getReplyList();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  // 새로운 댓글 내용을 변경하는 함수
  const handleNewReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleNewRereplyChange = (e) => {
    setAnswerContent(e.target.value);
  };


  // // 새로운 댓글 내용을 변경하는 함수
  // const replyUpdate = (e) => {
  //   setNewReply(e.target.value);
  // };

  // ❓ hook
  useEffect(() => {
    getBoard();
    getReplyList();
  }, [starNo]);


  return (
    <>
      <Read
        starNo={starNo}
        starBoard={starBoard}
        fileList={fileList}
        isLoading={isLoading}
        replyList={replyList}
        newReply={newReply}
        answerContent={answerContent}
        handleNewReplyChange={handleNewReplyChange}
        handleNewRereplyChange={handleNewRereplyChange}
        handleReplySubmit={handleReplySubmit}
        handleRereplySubmit={handleRereplySubmit}
        handleReplyDelete={handleReplyDelete}
        handleReplyUpdate={handleReplyUpdate}
        setAnswerContent={setAnswerContent}
        onDelete={onDelete}
        userInfo={userInfo}
        isLogin={isLogin}
      />
    </>
  );
};

export default ReadContainer;
