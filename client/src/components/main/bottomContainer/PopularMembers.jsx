import React, { useEffect, useState } from 'react';
import * as newAndPops from '../../../apis/main/newAndPops';
import './css/PopularMember.css'; // CSS 파일을 임포트합니다.
import { Link } from 'react-router-dom';

const PopularMembers = () => {
    const [popsList, setPopsList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getPopsList = async () => {
        setLoading(true);
        try {
            const response = await newAndPops.popularMembers();
            const data = response.data;
            setPopsList(data);
        } catch (error) {
            console.error('악 에러 싫어', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPopsList();
    }, []);

    return (
        <div>
            <div className="pop-con">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    popsList.map(pops => (
                        <Link to={`/${pops.starNo}`} className='pop-link' >
                        <div key={pops.userNo} className="pop-item">
                            <img src={`/file/img/${pops.userImgId}`} alt="User Icon" className="user-icon" />
                            <h5>{pops.writer}</h5>
                        </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default PopularMembers;