import React from 'react'
import ListContainer from '../../containers/board/ListContainer';
import MainLayout from '../../layouts/MainLayout';

const ReviewList = () => {
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
            
            type="review"
            optionList={optionList}
            page={page}
            option={option}
            toBoard={"/review"}
            
            />
        </MainLayout>
    </>
  )
}

export default ReviewList