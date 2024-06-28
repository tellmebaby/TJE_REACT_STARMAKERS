import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 필요한 경우 axios 사용

const Banner = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // 카드 데이터를 받아오는 비동기 함수
        async function fetchCardData() {
            try {
                const response = await axios.get('/api/cardData'); // API 엔드포인트를 맞게 수정
                setCards(response.data); // 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        }

        fetchCardData(); // 컴포넌트가 마운트될 때 카드 데이터를 받아옴
    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정
  return (
    <div id="promotionCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
    <div className="carousel-inner" id="carousel-inner">
        {cards.map((card, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.content}</p>
                        <div className="content-icons">
                            {card.categories.includes('afreeca') && <img src="/img/icon/afreeca.png" alt="아이콘1" className="content-icon" />}
                            {card.categories.includes('chzzk') && <img src="/img/icon/chzzk.png" alt="아이콘2" className="content-icon" />}
                            {card.categories.includes('youtube') && <img src="/img/icon/youtube.png" alt="아이콘3" className="content-icon" />}
                            {card.categories.includes('instagram') && <img src="/img/icon/instagram.png" alt="아이콘4" className="content-icon" />}
                        </div>
                        <div className="content-buttons">
                            {card.categories2.includes('music') && <a href="/page/starCard/starList?option=music" className="btn btn-custom">#음악</a>}
                            {card.categories2.includes('travel') && <a href="/page/starCard/starList?option=travel" className="btn btn-custom">#여행</a>}
                            {card.categories2.includes('food') && <a href="/page/starCard/starList?option=food" className="btn btn-custom">#음식</a>}
                            {card.categories2.includes('game') && <a href="/page/starCard/starList?option=game" className="btn btn-custom">#게임</a>}
                            {card.categories2.includes('animal') && <a href="/page/starCard/starList?option=animal" className="btn btn-custom">#동물</a>}
                            {card.categories2.includes('workOut') && <a href="/page/starCard/starList?option=workout" className="btn btn-custom">#운동</a>}
                            {card.categories2.includes('fashion') && <a href="/page/starCard/starList?option=fashion" className="btn btn-custom">#패션</a>}
                            {card.categories2.includes('asmr') && <a href="/page/starCard/starList?option=almr" id="asmr-link" className="btn btn-custom">#ASMR</a>}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
  )
}

export default Banner