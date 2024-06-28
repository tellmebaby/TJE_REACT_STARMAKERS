import React from 'react';

const IntroSection = ({ imgSrc, imgAlt, title, text }) => (
  <div className="row intro-section">
    <div className="col-md-6 intro-img">
      <img src={imgSrc} alt={imgAlt} />
    </div>
    <div className="col-md-6 intro-text">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  </div>
);
export default IntroSection;
