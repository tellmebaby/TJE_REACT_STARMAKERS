import React from 'react'
import { useParams } from 'react-router-dom'
import ReadContainer from '../../containers/board/ReadContainer'

const Read = () => {
   // 파라미터 가져오기
   const {starNo} = useParams()
   console.log(`starNo : ${starNo}`)
 return (
   <>
       {/* Header */}
       <ReadContainer starNo={starNo}/>
       {/* Footer */}
   </>
 )
}

export default Read