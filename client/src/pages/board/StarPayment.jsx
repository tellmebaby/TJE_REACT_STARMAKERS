import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import StarPaymentContainer from '../../containers/board/StarPaymentContainer'
import { useParams } from 'react-router-dom'

const StarPayment = () => {

    const {starNo}  = useParams();
    return (
        <MainLayout>
            <StarPaymentContainer starNo={starNo} />
        </MainLayout>
    )
}

export default StarPayment