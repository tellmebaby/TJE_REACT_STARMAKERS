import React from 'react';
import { Link } from 'react-router-dom';
import "./css/StarCategory2.css"

const StarCategory2 = ({ card }) => {
  const categories2 = card.category2.split(',');
  const musicBtn = categories2.includes('music') ? <button className="btn-custom">#음악</button> : null;
  const travelBtn = categories2.includes('travel') ? <button className="btn-custom">#여행</button> : null;
  const foodBtn = categories2.includes('food') ? <button className="btn-custom">#음식</button> : null;
  const gameBtn = categories2.includes('game') ? <button className="btn-custom">#게임</button> : null;
  const animalBtn = categories2.includes('animal') ? <button className="btn-custom">#동물</button> : null;
  const exerciseBtn = categories2.includes('workOut') ? <button className="btn-custom">#운동</button> : null;
  const fashionBtn = categories2.includes('fashion') ? <button className="btn-custom">#패션</button> : null;
  const asmrBtn = categories2.includes('asmr') ? <button id="asmr-link" className="btn-custom">#ASMR</button> : null;

  return (
    <div>
      <div className="field-links">
        {musicBtn}
        {travelBtn}
        {foodBtn}
        {gameBtn}
        {animalBtn}
        {exerciseBtn}
        {fashionBtn}
        {asmrBtn}
      </div>
    </div>
  );
}

export default StarCategory2;