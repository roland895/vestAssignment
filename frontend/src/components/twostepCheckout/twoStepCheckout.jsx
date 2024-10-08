import React, { useState } from 'react';
import './twoStepCheckout.css'; // Assuming you'll style it with a separate CSS file
import TabSelect from '../common/tabSelect';
import DiscreteSlider from '../common/discreteSlider';
const TwoStepCheckout = ({open=0}) => {
  // State to track tab
  const [isLongTab, setIsLongTab] = useState(0);
  // State for Order Type 
  const [OrderType, setOrderType] = useState('Market')
  const [size, setSize] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const ORDER_TYPES = ['Market','Not Market'];
  const POSITIONS = ['Long', 'Short'];
  const sliderLabels = ['2X', '5X', '10X', '25X', '50X', '100X', '120X'];

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue)
  };

  return (
    <div className="wrapper">
      <TabSelect  tabs={POSITIONS} selectedIndex={isLongTab} setIndex={setIsLongTab} />
      <div className="row">
        <div className='col order-type-select'>
          <label>
            Order type
          </label>
          <select value={OrderType} onChange={(e)=>{
            setOrderType(e.target.value);
          }}>
            {ORDER_TYPES.map((type)=>           
             <option value={type}>{type}</option>
            )}
          </select>
        </div>
        <div className='col'>
          <label>
            Open Price
          </label>
          <span>
            {open.toFixed(2)} USD
          </span>
        </div>
      </div>
      <div className='col sizeSelector'>
            <label>
              Size
            </label>
            <input type="number" value={size} onChange={(e)=>{setSize(e.target.value)}}>

            </input>
      </div>

      <div className='col sizeSelector'>
            <label>
              Leverage
            </label>
            <DiscreteSlider
              min={0}
              max={6}
              step={1}
              labels={sliderLabels}
              onChange={handleSliderChange}
            />
      </div>

    </div>
  );
};

export default TwoStepCheckout;