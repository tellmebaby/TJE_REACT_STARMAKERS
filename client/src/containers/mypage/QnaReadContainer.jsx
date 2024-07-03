import React, { useEffect, useState } from 'react'
import * as mypage from '../../apis/mypage'
import QnaReadForm from '../../components/mypage/QnaReadForm'

const QnaReadContainer = ({qnaNo}) => {
    // 🧊 state
  const [qnaBoard, setQnaBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  const getQnaBoard = async () => {
    setLoading(true)
    const response = mypage.qnaRead(qnaNo)
    
    setQnaBoard(response)
    console.log("container : " + response.title);
    setLoading(false)
  }


  // hook
  useEffect( () => {
    getQnaBoard()
  }, [qnaNo])
  return (
    <>
        <QnaReadForm
        qnaNo={qnaNo} qnaBoard={qnaBoard} isLoading={isLoading}
        />
    </>
  )
}

export default QnaReadContainer