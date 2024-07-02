import React from 'react'
import QnaReadContainer from '../../containers/board/QnaReadContainer'
import MainLayout from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'

const QnaRead = () => {
    // 파라미터 가져오기
   const {qnaNo} = useParams()
   console.log(`qnaNo : ${qnaNo}`)
  return (
    <>
       {/* Header */}
       <MainLayout>
       <QnaReadContainer qnaNo={qnaNo}/>
       </MainLayout>
       {/* Footer */}
   </>
  )
}

export default QnaRead