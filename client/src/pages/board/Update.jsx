import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import UpdateContainer from '../../containers/board/UpdateContainer'
import { useParams } from 'react-router-dom'

const Update = () => {
    const {starNo} = useParams()
    console.log(`starNo : ${starNo}`)
  return (
    <MainLayout>
        <UpdateContainer starNo={starNo}></UpdateContainer>
    </MainLayout>
  )
}

export default Update