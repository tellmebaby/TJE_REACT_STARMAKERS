import React, { useContext, useEffect, useState } from 'react';
import * as starBoards from '../../apis/starBoard';
import Read from '../../components/board/Read';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as Swal from '../../apis/alert'

const ReadContainer = ({ starNo }) => {
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  const [starBoard, setStarBoard] = useState({});
  const [fileList, setFileList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [answerContent, setAnswerContent] = useState('');
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // 게시글 조회
  const getBoard = async () => {
    setLoading(true);
    try {
      const response = await starBoards.select(starNo);
      const data = await response.data;
      setStarBoard(await data.starBoard);
      setFileList(await data.fileList || []);
      setLikes(await data.starBoard.likes);
      console.log(data.starBoard.likes);
      // 좋아요 상태 확인
      const likeResponse = await starBoards.checkLiked(userInfo.userNo, starNo);
      console.log("넘버 가져와라");
      console.log(await userInfo.userNo);
      setLiked(likeResponse.data);
      // if (userInfo.userNo) {
      // }
    } catch (error) {
      console.error('게시글 조회 실패:', error);
    }
    setLoading(false);
  };

  // 댓글 목록 조회
  const getReplyList = async () => {
    try {
      const response = await starBoards.replyList(starNo);
      setReplyList(response.data.replyList);
    } catch (error) {
      console.error('댓글 조회 실패:', error);
    }
  };

  // 게시글 삭제
  const onDelete = async (starNo) => {
    try {
      await starBoards.remove(starNo);
      Swal.alert("삭제 완료!");
      navigate(`/${starBoard.type}`);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };


 // 댓글--------------------------------------------댓글
  // const handleReplySubmit = async (e) => {
  //   // e.preventDefault();
  
  
  //   try {
  //     const replyData = {
  //       starNo,
  //       content: newReply,
  //       userNo: userInfo.userNo,
  //       writer: userInfo.id
        
  //       // username: "?"
  //     };
  //     console.log("아이디 제발 : ",userInfo.id)
      
  //     if (newReply.trim() === "") {
  //       alert("댓글을 입력하세요.");
  //       return;
  //     }
  
  //     console.log("replyData");
  //     console.log(replyData);
      
  //     const response = await starBoards.insertReply(replyData);
  //     // const data = await response.data
  //     console.log("데이터 가져와");
  //     // console.log(data);
  //     console.log("Reply submission response:", response.data);} catch {}
  //   }
  // 댓글 등록
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (newReply.trim() === "") {
      Swal.alert("댓글을 입력하세요.");
      return;
    }
    const replyData = {
      starNo,
      content: newReply,
      userNo: userInfo.userNo,
      writer: userInfo.id,
    };
    try {
      await starBoards.insertReply(replyData);
      setNewReply("");
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


  // const handleReplyDelete = async (replyNo) => {
  //   await starBoards.deleteReply(replyNo);
  //   window.confirm("삭제하시겠습니까?")
  //   getReplyList();

  // 댓글 삭제
  const handleReplyDelete = async (replyNo) => {
    try {
      await starBoards.deleteReply(replyNo);
      Swal.alert("삭제 완료!");
      getReplyList();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }

  };

  // 댓글 수정
  const handleReplyUpdate = async (replyNo, content) => {
    try {
      await starBoards.updateReply({ replyNo, writer: userInfo.id, content });
      Swal.alert("수정 완료!")
      getReplyList();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  // 좋아요 토글
  const handleLikeToggle = async () => {
    try {
      if (isLogin) {
        const response = await starBoards.toggleLike(userInfo.userNo, starNo);
        setLiked(response.data.liked);
        setLikes(response.data.likeCount);
        console.log("좋아용");
        console.log(response.data.liked);
      } else {
        alert('로그인을 하시기 바랍니다.')
        navigate('/login')
      }
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handleNewRereplyChange = (e) => {
    setAnswerContent(e.target.value);
  };

  const handleNewReplyChange = (e) => {
    setNewReply(e.target.value);
  };


  // // 새로운 댓글 내용을 변경하는 함수
  // const replyUpdate = (e) => {
  //   setNewReply(e.target.value);
  // };

  // ❓ hook
  useEffect(() => {
    if(userInfo){
      getBoard();
      getReplyList();
    } else {
      getBoard();
      getReplyList();
    }
  }, [starNo,userInfo]);

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
        likes={likes}
        liked={liked}
        onLikeToggle={handleLikeToggle}
      />
    </>
  );
};


export default ReadContainer;
