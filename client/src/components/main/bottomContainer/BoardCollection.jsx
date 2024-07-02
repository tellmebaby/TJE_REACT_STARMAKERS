import React, { useState, useEffect } from 'react';
import './css/BoardCollection.css';
import PostFragment from './PostFragment';
import * as newAndPops from '../../../apis/main/newAndPops';

const BoardCollection = () => {
    const [reviewFragList, setReviewFragList] = useState([]);
    const [eventFragList, setEventFragList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getReviewFragList = async () => {
        setLoading(true);
        try {
            const response = await newAndPops.getFragByReview();
            const data = response.data;
            setReviewFragList(data);
        } catch (error) {
            console.error('시러에러시러', error);
        } finally {
            setLoading(false);
        }
    };

    const getEventFragList = async () => {
        setLoading(true);
        try {
            const response = await newAndPops.getFragByEvent();
            const data = response.data;
            setEventFragList(data);
        } catch (error) {
            console.error('시러에러시러', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReviewFragList();
        getEventFragList();
    }, []);

    return (
        <div className='NewEventCon'>
            <div className='NewEventEntries'>
                <PostFragment dataList={eventFragList} isLoading={isLoading} />
            </div>
            <div className='NewEventReviews'>
                <PostFragment dataList={reviewFragList} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default BoardCollection;