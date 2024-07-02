import React, { useEffect, useState } from 'react';
import * as qna from '../../apis/qna';
import QnaRead from '../../components/board/QnaRead';

const QnaReadContainer = ({ qnaNo }) => {
  // 🧊 state
  const [qnaBoard, setQnaBoard] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getQnaBoard = async () => {
    setLoading(true);
    try {
      const response = await qna.select(qnaNo);
      setQnaBoard(response);
    } catch (error) {
      console.error('Error fetching Q&A board:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAnswer = async (answer) => {
    setLoading(true);
    try {
      await qna.insertAnswer({ qnaNo, answer });
      await getQnaBoard();
    } catch (error) {
      console.error('Error adding answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = async (answer) => {
    setLoading(true);
    try {
      await qna.insertAnswer({ qnaNo, answer });
      await getQnaBoard();
    } catch (error) {
      console.error('Error updating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnswer = async () => {
    setLoading(true);
    try {
      await qna.deleteAnswer({ qnaNo });
      await getQnaBoard();
    } catch (error) {
      console.error('Error deleting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  // hook
  useEffect(() => {
    getQnaBoard();
  }, [qnaNo]);

  return (
    <>
      <QnaRead
        qnaNo={qnaNo}
        qnaBoard={qnaBoard}
        isLoading={isLoading}
        addAnswer={addAnswer}
        updateAnswer={updateAnswer}
        deleteAnswer={deleteAnswer}
      />
    </>
  );
};

export default QnaReadContainer;
