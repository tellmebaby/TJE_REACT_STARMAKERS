import React, { useEffect, useState } from 'react';
import Search from '../../components/main/Search';
import * as cards from '../../apis/main/cards';
import CardSlide from '../../components/main/CardSlide';
import BannerSlider from '../../components/main/BannerSlider';
import BottomCon from '../../components/main/BottomCon';

const HomeContainer = () => {
    const [cardList, setCardList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  
  useEffect(() => {
    if (isLoading) {
      
    }
    const getCardList = async () => {
      
      try {
        const response = await cards.starCardList();
        const data = response.data;
        setCardList(data);
        
      } catch (error) {
        console.error('Error fetching card list:', error);
      } finally {
        
      }
    };

    getCardList();
  }, []);
  return (
    <>
      <Search />
      <CardSlide cardList={cardList} isLoading={isLoading} />
      <BannerSlider />
      <BottomCon />
    </>
  )
}

export default HomeContainer