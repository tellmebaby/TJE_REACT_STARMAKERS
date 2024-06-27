import React, { useEffect, useState } from 'react'
import QnaList from '../components/Mypage/QnaListForm'
import * as mypage from '../apis/mypage'

const QnaListContainer = () => {

  // state
  const [qnaList, setQnaList] = useState([])

  // 함수
const getQnaList = async () => {
  const response = await mypage.qnaList()
  const data = await response.data
  setQnaList(data)
}

  // hook
  useEffect(() => {
    getQnaList()
  }, [])

  return (
    <QnaList qnaList={qnaList} />
  )
}

export default QnaListContainer