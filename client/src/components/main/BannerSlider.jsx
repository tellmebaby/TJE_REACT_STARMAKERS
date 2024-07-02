import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/BannerSlider.css'; // CSS 파일을 import 합니다.

const BannerSlider = () => {
    const [starListEvent, setStarListEvent] = useState([]);

    useEffect(() => {
        axios.get('/getBanner') // 데이터를 가져올 URL
            .then(response => {
                setStarListEvent(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="banner-slider">
            <div id="bannerCarousel" className="carousel slide align-items-start" data-bs-ride="carousel" data-bs-interval="5000">
                <div className="carousel-inner">
                    {starListEvent.map((starBoard, index) => (
                        <div key={starBoard.starNo} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="event-banner align-items-start">
                                <Link to={`/board/eventBoard/eventPost?starNo=${starBoard.starNo}`}>
                                    <img src={`/file/img/${starBoard.imgNo}`} className="image rounded mt-auto" alt="썸네일" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default BannerSlider;