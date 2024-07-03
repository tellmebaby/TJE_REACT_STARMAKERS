import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from '../../contexts/SessionContext';
import { LoginContext } from '../../contexts/LoginContextProvider';
import styles from '../board/css/read.module.css'


const Read = ({ starNo, starBoard, fileList, isLoading, onDelete }) => {
  const { session } = useSession();
  // const [likeCount, setLikeCount] = useState(board.likes || 0);
  const [comments, setComments] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyWriter, setReplyWriter] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  // const [starBoard, setStarBoard] = useState(null)


  // useEffect(() => {
  //   if (board.likes !== undefined) {
  //     setLikeCount(board.likes);
  //   }
  // }, [board.likes]);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/page/reply/${starNo}`);
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다.', error);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     const response = await axios.post('/page/like', { userNo: session.user.userNo, starNo });
  //     if (response.data.liked) {
  //       setLikeCount(likeCount + 1);
  //     } else {
  //       setLikeCount(likeCount - 1);
  //     }
  //   } catch (error) {
  //     console.error('좋아요 상태 변경 실패:', error);
  //   }
  // };
  console.log("이거되나 ? ? ?  ? "  + starBoard.writer);


  const handleDelete = () => {
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if (check) {
      onDelete(starNo)
    }
  }

  const handleReplySubmit = async () => {
    if (replyContent.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/page/reply', {
        starNo,
        writer: replyWriter,
        content: replyContent,
        username: session.user.email
      });
      if (response.data === 'SUCCESS') {
        fetchComments();
        setReplyContent('');
      }
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const handleEditComment = (commentId) => {
    const comment = comments.find(comment => comment.id === commentId);
    setEditingCommentId(commentId);
    setEditingCommentContent(comment.content);
  };

  const handleEditCommentSubmit = async (commentId) => {
    try {
      const response = await axios.put(`/page/reply/${commentId}`, {
        content: editingCommentContent
      });
      if (response.data === 'SUCCESS') {
        fetchComments();
        setEditingCommentId(null);
        setEditingCommentContent('');
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/page/reply/${commentId}`);
        if (response.data === 'SUCCESS') {
          fetchComments();
        }
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    }
  };

  return (
    <div className="container2" style={{ padding: '10px' }}>
      <center> {
          starBoard.type == 'an' ?
            <h1>공지사항</h1>
          : <></>
        }
        {
          starBoard.type == 'event' ?
            <h1>이벤트</h1>
          : <></>
        }
        {
          starBoard.type == 'review' ?
            <h1>후기</h1>
          : <></>
        }
        {
          starBoard.type == 'starCard' ?
            <h1>홍보</h1>
          : <></>
        }</center>
      {
        !isLoading && starBoard && (
          <><div className={styles.writer}>
            <label>{starBoard.writer}</label>
            <label>{new Date(starBoard.regDate).toLocaleString()}</label>
          </div><div className={styles['title-container']}>
              <span>{starBoard.title}</span>
              <hr />
            </div></>

        )
      }
      <div className={styles['content-container']}>
        <div>
          {/* {fileList.length > 0 && (
            <img src={`/file/img/${fileList[0].imgNo}`} className="image rounded mt-auto" style={{ width: '800px' }} alt="썸네일" />
          )} */}
        </div>
        <span dangerouslySetInnerHTML={{ __html: starBoard.content }}></span>
      </div>
      {/* <div className="button-box1">
        <button className="like-btn" onClick={handleLike} disabled={!session}>
          <i className={`fa fa-star ${board.action === 'liked' ? 'fa-solid' : 'fa-regular'}`}></i>
        </button>
        <span id="like-count">{likeCount}</span>
      </div> */}
      <div className={`d-flex justify-content-end mt-2 ${styles['button-box']}`}>
        <button className={styles['btn-list']} type="button" onClick={() => window.location.href = `/${starBoard.type}`}>목록</button>
        {userInfo && userInfo.userNo === starBoard.userNo && (
          <>
            <button className={styles['btn-update']} type="button" onClick={() => window.location.href = `/update/${starNo}`}>수정</button>
            <button className={styles['btn-delete']} type="button" onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
      <div className={styles['reply-container']}>
        <div className={styles['reply-box']}>
          <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다. 로그인 하신 분만 댓글을 작성할 수 있습니다." disabled={!isLogin}></textarea>
          <button type="button" className="btn-reply" onClick={handleReplySubmit} disabled={!session}>등록</button>
        </div>
      </div>
      <div className="top-reply-list">
        <label className="reply">댓글</label>
        <label className="reply-count">{comments.length} 개</label>
      </div>
      <div id="reply-listbox">
        <div id="reply-list">
          {comments.map(comment => (
            <div key={comment.id} className="reply">
              {editingCommentId === comment.id ? (
                <>
                  <textarea value={editingCommentContent} onChange={(e) => setEditingCommentContent(e.target.value)}></textarea>
                  <button onClick={() => handleEditCommentSubmit(comment.id)}>저장</button>
                  <button onClick={() => setEditingCommentId(null)}>취소</button>
                </>
              ) : (
                <>
                  <div className="reply-writer">{comment.writer}</div>
                  <div className="reply-content">{comment.content}</div>
                  <div className="reply-date">{new Date(comment.date).toLocaleString()}</div>
                  {session && session.user && session.user.userNo === comment.userNo && (
                    <>
                      <button onClick={() => handleEditComment(comment.id)}>수정</button>
                      <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Read;
