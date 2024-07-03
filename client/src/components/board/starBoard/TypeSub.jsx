import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TypeSub = ({ option, label, icon, handleInputClick, isOptionSelected }) => {
  return (
    <div
      className="type-sub"
      onClick={() => handleInputClick(option, label)}
      style={{
        border: isOptionSelected(option) ? '3px solid green' : 'none',
      }}
    >
      <input className="hide-check" type="checkbox" id={option} checked={isOptionSelected(option)} readOnly />
      <label htmlFor={option}>{label}</label>
      {icon && icon}
    </div>
  );
};

export default TypeSub;