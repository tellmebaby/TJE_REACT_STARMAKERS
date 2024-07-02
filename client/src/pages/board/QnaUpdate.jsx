import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import QnaUpdateContainer from '../../containers/board/QnaUpdateContainer'
import { useParams } from 'react-router-dom'

const QnaUpdate = () => {
    const {qnaNo} = useParams()
    console.log(`qnaNo : ${qnaNo}`)
  return (
    <MainLayout>
        <QnaUpdateContainer qnaNo={qnaNo}></QnaUpdateContainer>
    </MainLayout>
  )
}

export default QnaUpdate