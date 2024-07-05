import React, { useContext, useState, useEffect } from 'react';
import styles from '../board/css/read.module.css';
import { LoginContext } from '../../contexts/LoginContextProvider';

const ReplyList = ({ reply, deleteReply, updateReply, handleRereplySubmit, answerContent, handleNewRereplyChange, setAnswerContent, showAnswerBox, toggleAnswerBox }) => {
  const { userInfo } = useContext(LoginContext);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [newReplyContent, setNewReplyContent] = useState('');

  const startEditing = (replyNo, currentContent) => {
    setEditingReplyId(replyNo);
    setNewReplyContent(currentContent);
  };

  const cancelEditing = () => {
    setEditingReplyId(null);
    setNewReplyContent('');
  };

  const handleUpdate = () => {
    updateReply(editingReplyId, newReplyContent)
      .then(() => {
        cancelEditing();
      })
      .catch(error => {
        console.error("Error updating reply:", error);
      });
  };

  const handleInsertAnswer = (replyNo) => {
    handleRereplySubmit(replyNo, answerContents[replyNo] || '')
      .then(() => {
        toggleAnswerBox(null); // 답글 상자 닫기
        setAnswerContent(''); // 답글 내용 초기화
      })
      .catch(error => {
        console.error("Error inserting answer:", error);
      });
  };

  // const toggleAnswerBox = (replyNo) => {
  //   if (showAnswerBox === replyNo) {
  //     setShowAnswerBox(null); // 같은 댓글을 다시 누르면 답글 상자 닫기
  //   } else {
  //     setShowAnswerBox(replyNo); // 새로운 댓글의 답글 상자 열기
  //   }
  // };

  const handleAnswerContentChange = (replyNo, content) => {
    setAnswerContents(prevState => ({
      ...prevState,
      [replyNo]: content
    }));
  };

  useEffect(() => {
    if (showAnswerBox !== null) {
      setAnswerContents(prevState => ({
        ...prevState,
        [showAnswerBox]: ''
      }));
    }
  }, [showAnswerBox]);

  return (
    <div>
      {reply.replyNo === reply.parentNo && (
        <div className={styles['reply-line']}>
          <div className={styles['reply-top']}>
            <span className={styles['reply-writer']}>{reply.writer}</span>
            <span className={styles['reply-regDate']}>
              {new Date(reply.regDate).toLocaleString()}
            </span>
          </div>
          <div className={styles['reply-con']}>
            <div className={styles['reply-middle']}>
              {editingReplyId === reply.replyNo ? (
                <>
                  <textarea
                    className={styles['reply-textarea']} cols="100"
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                  />
                  <div className={styles['reply-button']}>
                    <button className={styles['btn-reply-update']} onClick={handleUpdate}>수정</button>
                    <button className={styles['btn-reply-cancel']} onClick={cancelEditing}>취소</button>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles['reply-content']}>{reply.content}</p>
                  <div className={styles['reply-button']}>
                    {userInfo && userInfo.userNo === reply.userNo && (
                      <>
                        <button className={styles['btn-reply-update']} onClick={() => startEditing(reply.replyNo, reply.content)}>수정</button>
                        <button className={styles['btn-reply-delete']} onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles['reply-rereply']}>
            <button className={styles['btn-rereply']} onClick={() => toggleAnswerBox(reply.replyNo)}>답글쓰기</button>
          </div>
          {showAnswerBox === reply.replyNo && (
            <div className={styles['rereply-container']} id={`answer-${reply.replyNo}`}>
              <div className={styles['rereply-box']}>
                <textarea
                  placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다."
                  value={answerContents[reply.replyNo] || ''}
                  onChange={(e) => handleAnswerContentChange(reply.replyNo, e.target.value)}
                />
                <button type="button" onClick={() => handleInsertAnswer(reply.replyNo)}>등록</button>
              </div>
            </div>
          )}
        </div>
      )}

      {reply.replyNo !== reply.parentNo && (
        <div className={styles['rereply-list']} id={`rereply-list-${reply.replyNo}`}>
          <div className={styles['rereply']}>
            <div className={styles['rereply-top']}>
              <span className={styles['rereply-writer']}>{reply.writer}</span>
              <span className={styles['rereply-regDate']}>
                {new Date(reply.regDate).toLocaleString()}
              </span>
            </div>
            <div className={styles['rereply-con']}>
              <div className={styles['rereply-middle']}>
                {editingReplyId === reply.replyNo ? (
                  <>
                    <textarea
                      className={styles['reply-textarea']}
                      value={newReplyContent}
                      onChange={(e) => setNewReplyContent(e.target.value)}
                    />
                    <div className={styles['reply-button']}>
                      <button className={styles['btn-reply-update']} onClick={handleUpdate}>수정</button>
                      <button className={styles['btn-reply-cancel']} onClick={cancelEditing}>취소</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className={styles['rereply-content']}>{reply.content}</p>
                    <div className={styles['reply-button']}>
                      {userInfo && userInfo.userNo === reply.userNo && (
                        <>
                          <button className={styles['btn-rereply-update']} onClick={() => startEditing(reply.replyNo, reply.content)}>수정</button>
                          <button className={styles['btn-rereply-delete']} onClick={() => deleteReply(reply.replyNo)}>삭제</button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            {showAnswerBox === reply.replyNo && (
              <div className={styles['rereply-container']} id={`answer-${reply.replyNo}`}>
                <div className={styles['rereply-box']}>
                  <textarea
                    placeholder="자유롭게 의견을 작성하세요. 운영원칙에 위배되는 댓글은 삭제될 수 있습니다."
                    value={answerContents[reply.replyNo] || ''}
                    onChange={(e) => handleAnswerContentChange(reply.replyNo, e.target.value)}
                  />
                  <button type="button" onClick={() => handleRereplySubmit(reply.replyNo)}>등록</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyList;
