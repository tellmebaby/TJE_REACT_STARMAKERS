import React, { useEffect, useState } from 'react';
import Search from '../../components/main/Search';
import * as cards from '../../apis/main/cards';
import CardSlide from '../../components/main/CardSlide';
import './css/star'

const HomeContainer = () => {
    const [cardList, setCardList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getCardList = async () => {
    setLoading(true);
    try {
      const response = await cards.starCardList();
      const data = response.data;
      setCardList(data);
    } catch (error) {
      console.error('Error fetching card list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardList();
  }, []);
  return (
    <>
      <Search />
      <CardSlide cardList={cardList} isLoading={isLoading} />
    </>
  )
}

export default HomeContainer