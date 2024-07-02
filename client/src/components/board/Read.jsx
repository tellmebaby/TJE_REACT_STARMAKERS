import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from '../../contexts/SessionContext';

const Read = ({ starNo, starBoard, fileList, isLoading }) => {
  const { session } = useSession();
  // const [likeCount, setLikeCount] = useState(board.likes || 0);
  const [comments, setComments] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyWriter, setReplyWriter] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  // const [starBoard, setStarBoard] = useState(null)


  // useEffect(() => {
  //   if (board.likes !== undefined) {
  //     setLikeCount(board.likes);
  //   }
  // }, [board.likes]);
  // useEffect(() => {
  //   fetchComments();
  // }, []);

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


  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.post('/page/board/eventBoard/delete', { starNo, _csrf: session._csrf });
        alert('삭제되었습니다.');
        window.location.href = '/page/board/eventBoard/eventList';
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

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
    <div className="container2">
      <center><h3 className="event">EVENT</h3></center>
      {
        !isLoading && starBoard && (
          <><div className="writer">
            <label>{starBoard.writer}</label>
            <label>{new Date(starBoard.regDate).toLocaleString()}</label>
          </div><div className="title-container">
              <span>{starBoard.title}</span>
              <hr />
            </div></>

        )
      }
      <div className="content-container">
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
      <div className="d-flex justify-content-end mt-2 button-box">
        <button className="btn-list" type="button" onClick={() => window.location.href = '/page/board/eventBoard/eventList'}>목록</button>
        {session && session.user && session.user.userNo === starBoard.userNo && (
          <>
            <button className="btn-update" type="button" onClick={() => window.location.href = `/page/board/eventBoard/eventUpdate?starNo=${starNo}`}>수정</button>
            <button className="btn-delete" type="button" onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
      <div className="reply-container">
        <div className="reply-box">
          <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다. 로그인 하신 분만 댓글을 작성할 수 있습니다." disabled={!session}></textarea>
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
