import React from 'react'
import { useParams } from 'react-router-dom'
import ReadContainer from '../../containers/board/ReadContainer'
import MainLayout from '../../layouts/MainLayout'

const Read = () => {
   // 파라미터 가져오기
   const {starNo} = useParams()
   console.log(`starNo : ${starNo}`)
 return (
   <>
       <MainLayout>
       <ReadContainer starNo={starNo}/>
       </MainLayout>
   </>
 )
}

export default Read