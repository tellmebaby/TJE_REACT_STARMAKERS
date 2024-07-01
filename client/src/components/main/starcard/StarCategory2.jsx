import React from 'react';
import { Link } from 'react-router-dom';

const StarCategory2 = ({ card }) => {
  const categories2 = card.category2.split(',');
  const musicBtn = categories2.includes('music') ? <Link to="/page/starCard/starList?option=music" className="btn-custom">#음악</Link> : null;
  const travelBtn = categories2.includes('travel') ? <Link to="/page/starCard/starList?option=travel" className="btn-custom">#여행</Link> : null;
  const foodBtn = categories2.includes('food') ? <Link to="/page/starCard/starList?option=food" className="btn-custom">#음식</Link> : null;
  const gameBtn = categories2.includes('game') ? <Link to="/page/starCard/starList?option=game" className="btn-custom">#게임</Link> : null;
  const animalBtn = categories2.includes('animal') ? <Link to="/page/starCard/starList?option=animal" className="btn-custom">#동물</Link> : null;
  const exerciseBtn = categories2.includes('workOut') ? <Link to="/page/starCard/starList?option=workout" className="btn-custom">#운동</Link> : null;
  const fashionBtn = categories2.includes('fashion') ? <Link to="/page/starCard/starList?option=fashion" className="btn-custom">#패션</Link> : null;
  const asmrBtn = categories2.includes('asmr') ? <Link to="/page/starCard/starList?option=asmr" id="asmr-link" className="btn-custom">#ASMR</Link> : null;

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