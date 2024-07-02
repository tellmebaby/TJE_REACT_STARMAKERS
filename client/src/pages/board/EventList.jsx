import React from 'react';
import ListContainer from '../../containers/board/ListContainer';
import MainLayout from '../../layouts/MainLayout';

const EventList = () => {
  

  return (
    <>
      <MainLayout>

        <ListContainer
          type="event"
        />
      </MainLayout>
    </>
  );
};

export default EventList;
