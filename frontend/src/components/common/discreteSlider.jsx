import React, { useState } from 'react';
import './discreteSlider.css';  // Assuming you want to style the slider separately

const DiscreteSlider = ({ min, max, step, labels, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  const progressPercentage = ((value - min) / (max - min)) * 100;
  const thumbSize = 20; 

  return (
    <div className="discrete-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
        style={{
          background: `linear-gradient(to right, #AEADAD ${progressPercentage}%, #252525 ${progressPercentage}%)`
        }}

      />
      <div className="slider-ticks">
      {labels.map((label, index) => {
        const leftPosition = `calc(${(index / (labels.length - 1)) * 100}% - ${thumbSize / 2}px)`;
        return(
          <span key={index} onClick={()=>{setValue(index); onChange(index);}}
          className="slider-tick" style={{ left: leftPosition, ...((index == 0 || index == labels.length - 1) && {visibility : 'hidden'})}}
          ></span>
        )
      })}
      </div>
      <div className="slider-labels">
        {labels.map((label, index) => {
          const leftPosition = `calc(${(index / (labels.length - 1)) * 100}%)`;
          return (
          <span
            key={index}
            onClick={()=>{setValue(index); onChange(index);}}
            className={`slider-label ${value === min + index * step ? 'active' : ''}`}
            style={{ left: leftPosition }}
            >
            {label}
          </span>
          )}
        )}
      </div>
    </div>
  );
};

export default DiscreteSlider;