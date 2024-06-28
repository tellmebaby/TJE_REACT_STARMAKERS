import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ListContainer from '../../containers/board/ListContainer'

const AnList = () => {
    const optionList = []
    const page = {
        first : 1,
        prev: 1,
        start: 1,
        end: 10,
        nest: 2,
        last: 10,
        page: 1,
    }
    const option = {
        code: '',
        keyword: '',
    }
    
  return (
    <>
    <MainLayout>
        <ListContainer
        type="an"
        optionList={optionList}
        page={page}
        option={option}
        toBoard={"/an"}
        />
    </MainLayout>
    </>
  )
}

export default AnList