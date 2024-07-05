import React, { useState, useEffect, useContext } from 'react';
import styles from '../board/css/qnaRead.module.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';


const QnaRead = ({ qnaNo, qnaBoard, isLoading, user, addAnswer, updateAnswer, deleteAnswer, onDelete }) => {
  const [answer, setAnswer] = useState('');
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  const navigate = useNavigate();
  const { isLogin, logout, userInfo } = useContext(LoginContext)
  useEffect(() => {
    setAnswer(qnaBoard.answer || '');
  }, [qnaBoard]);

  // const moveList = () => {
  //   window.location.href = '/qna/qnaList';
  // };

  const handleBack = () => {
    navigate(-1);  // -1은 뒤로 가기를 의미합니다.
  };

  const update = () => {
    window.location.href = `/qna/update/${qnaNo}`;
  };

  // const handleDelete = () => {
  //   const check = window.confirm("정말로 삭제하시겠습니까?")
  //   if (check) {
  //     onDelete(qnaNo)
  //   }
  // }

  const toggleAnswer = () => {
    setIsEditingAnswer(!isEditingAnswer);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAddAnswer = () => {
    if (answer.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    addAnswer(answer);
    setIsEditingAnswer(false);
  };

  const handleUpdateAnswer = () => {
    if (answer.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    updateAnswer(answer);
    setIsEditingAnswer(false);
  };

  const handleDeleteAnswer = () => {
    if (window.confirm('답변을 삭제하시겠습니까?')) {
      deleteAnswer();
    }
  };

  const actionDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      document.getElementById('deleteForm').submit();
    }
  };

  return (
    <div className="container2" style={{ padding: '10px' }}>
      <center>
        <h3 className={styles.notice}>Q&A</h3>
        <label className={styles.eventtext}>
          운영원칙에 위배되는 글은 관리자에 의해 무통보 삭제될 수 있습니다.
        </label>
      </center>
      <div className={styles.writer}>
        <label>{qnaBoard.writer}</label>
        <label>{new Date(qnaBoard.regDate).toLocaleString()}</label>
      </div>
      <div className={styles['title-container']}>
        <span>{qnaBoard.title}</span>
        <hr />
      </div>
      <div className={styles['content-container']}>
        <div dangerouslySetInnerHTML={{ __html: qnaBoard.content }}></div>
      </div>
      <div className={`d-flex justify-content-end mt-2 ${styles['button-box']}`}>
        <button className={styles['btn-list']} type="button" onClick={handleBack}>
          목록
        </button>
        {userInfo && userInfo.userNo === qnaBoard.userNo && (
          <>
            <button className={styles['btn-update']} type="button" onClick={update}>
              수정
            </button>
            <input
              className={styles['btn-delete']}
              type="button"
              onClick={() => onDelete(qnaNo)}
              value="삭제"
            />
          </>
        )}
      </div>
      <label className={styles.answer}>답변</label>
      <form>
        <div className={styles['answer-container']}>
          {!isEditingAnswer && <span className={styles['answer-span']}>{qnaBoard.answer}</span>}
          {isEditingAnswer && (
            <textarea
              className={styles['answer-textarea']}
              name="answer"
              style={{ width: '100%', height: '150px' }}
              placeholder="답변을 입력하세요..."
              value={answer}
              onChange={handleAnswerChange}
            ></textarea>
          )}
          <input type="hidden" name="qnaNo" id="qnaNo" value={qnaNo} />
        </div>
        <div className={styles['button-container1']}>
          {!qnaBoard.answer && !isEditingAnswer && (
            <button className={styles['btn-answer']} type="button" onClick={toggleAnswer}>
              답변 등록
            </button>
          )}
          {isEditingAnswer && !qnaBoard.answer && (
            <button className={styles['btn-answer']} type="button" onClick={handleAddAnswer}>
              답변 제출
            </button>
          )}
          {qnaBoard.answer && (
            <>
              <div className={styles['button-container2']}>
                {!isEditingAnswer ? (
                  <button
                    type="button"
                    className={styles['btn-update-answer']}
                    onClick={toggleAnswer}
                  >
                    수정
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles['btn-update-answer']}
                    onClick={handleUpdateAnswer}
                  >
                    수정 완료
                  </button>
                )}
              </div>
              <div className={styles['button-container3']}>
                <button
                  type="button"
                  className={styles['btn-delete-answer']}
                  onClick={handleDeleteAnswer}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      </form>
      <form
        id="deleteForm"
        method="post"
        action={`/page/board/qnaBoard/qnaDelete?qnaNos=${qnaNo}`}
      ></form>
    </div>
  );
};

export default QnaRead;
