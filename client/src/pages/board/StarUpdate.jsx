import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import StarUpdateContainer from '../../containers/board/StarUpdateContainer'
import { useParams } from 'react-router-dom'

const StarUpdate = () => {
    const {starNo} = useParams()
    console.log("starNo : " + starNo);
  return (
    <MainLayout>
        <StarUpdateContainer starNo={starNo}/>
    </MainLayout>
  )
}

export default StarUpdate