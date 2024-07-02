import React, { useState } from 'react';

const QnaRead = ({ qnaNo, qnaBoard, isLoading, user, csrfToken }) => {
  const [answer, setAnswer] = useState(qnaBoard.answer || '');
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);

  const moveList = () => {
    window.location.href = '/qna/qnaList';
  };

  const update = () => {
    window.location.href = `/page/board/qnaBoard/qnaUpdate?qnaNo=${qnaNo}`;
  };

  const toggleAnswer = () => {
    setIsEditingAnswer(!isEditingAnswer);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const submitAnswer = () => {
    if (answer.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    alert('답변이 등록되었습니다!');
    // 실제 제출 로직은 여기에 추가
  };

  const updateAnswer = () => {
    if (answer.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    alert('답변이 수정되었습니다!');
    // 실제 제출 로직은 여기에 추가
  };

  const actionDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      document.getElementById('deleteForm').submit();
    }
  };

  const deleteAnswer = () => {
    if (window.confirm('답변을 삭제하시겠습니까?')) {
      // 실제 삭제 로직은 여기에 추가
    }
  };

  return (
    <div className="container2">
      <center>
        <h3 className="notice">Q&A</h3>
        <label className="eventtext">
          운영원칙에 위배되는 글은 관리자에 의해 무통보 삭제될 수 있습니다.
        </label>
      </center>
      <div className="writer">
        <label>{qnaBoard.writer}</label>
        <label>{new Date(qnaBoard.regDate).toLocaleString()}</label>
      </div>
      <div className="title-container">
        <span>{qnaBoard.title}</span>
        <hr />
      </div>
      <div className="content-container">
        <div dangerouslySetInnerHTML={{ __html: qnaBoard.content }}></div>
      </div>
      <div className="d-flex justify-content-end mt-2 button-box">
        <button className="btn-list" type="button" onClick={moveList}>
          목록
        </button>
        {user && user.userNo === qnaBoard.userNo && (
          <>
            <button className="btn-update" type="button" onClick={update}>
              수정
            </button>
            <input
              className="btn-delete"
              type="button"
              onClick={actionDelete}
              value="삭제"
            />
          </>
        )}
      </div>
      <label className="answer">답변</label>
      <form action="/page/board/qnaBoard/qnaPost" method="post" id="form">
        {/* <input type="hidden" name={csrfToken.parameterName} value={csrfToken.token} /> */}
        <div className="answer-container">
          {!isEditingAnswer && <span id="answer-span">{answer}</span>}
          {isEditingAnswer && (
            <textarea
              id="answer-textarea"
              name="answer"
              style={{ width: '100%', height: '150px' }}
              placeholder="답변을 입력하세요..."
              value={answer}
              onChange={handleAnswerChange}
            ></textarea>
          )}
          <input type="hidden" name="qnaNo" id="qnaNo" value={qnaNo} />
        </div>
        <div className="button-container1">
          {user && user.roles.includes('ROLE_ADMIN') && (
            <>
              {!answer && (
                <button type="button" id="toggle-button" onClick={toggleAnswer}>
                  답변 등록
                </button>
              )}
              {answer && (
                <div className="button-wrapper">
                  <div className="button-container2">
                    <button
                      type="button"
                      id="update-answer-button"
                      onClick={updateAnswer}
                    >
                      수정
                    </button>
                  </div>
                  <div className="button-container1">
                    <button
                      type="button"
                      id="delete-answer-button"
                      onClick={deleteAnswer}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </form>
      <form
        id="deleteForm"
        method="post"
        action={`/page/board/qnaBoard/qnaDelete?qnaNos=${qnaNo}`}
      >
        {/* <input type="hidden" name={csrfToken.parameterName} value={csrfToken.token} /> */}
      </form>
    </div>
  );
};

export default QnaRead;
