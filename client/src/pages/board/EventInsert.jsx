import React from 'react'
import InsertContainer from '../../containers/board/InsertContainer'
import MainLayout from '../../layouts/MainLayout'


const EventInsert = () => {
    return (
        <>
            <MainLayout>
                <h1 className='d-flex justify-content-center mb-3 mt-3'>이벤트 등록</h1>
                <InsertContainer type={"event"} isFile={true} />
            </MainLayout>
        </>
    )
}

export default EventInsert