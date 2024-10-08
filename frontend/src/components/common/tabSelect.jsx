import React, { useState, useRef } from 'react';
import './tabSelect.css';

//I saw this style used in two parts of the dashboard so I put this component in a Common Dir
const TabSelect = ({tabs, selectedIndex, setIndex, maxWidth, margin=0}) => {
  const tabRef = useRef(null);
  return(
    <div className='position-select'>
      {tabs.map((tab, i) => {
        return(
          <a ref={tabRef} key={i} onClick={()=>{
            setIndex(i)}
          } 
            className={'position ' + (selectedIndex == i ? 'isActive' : '')}
            style={{...(maxWidth && {'maxWidth': `${maxWidth}px`}), ...((margin && i>0)  && {'margin-left': `${margin}px`})}}
          >
            {tab}
          </a>
        )
      })}      
      <div className={'underline '} style={{left:`${selectedIndex * (tabRef.current?.offsetWidth + margin)}px`, width:`${tabRef.current?.offsetWidth}px`}}/>
  </div>
  )
}
export default TabSelect