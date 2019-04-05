
import React from 'react'

import imgEur5 from './img/eur5.jpg'
import imgEur10 from './img/eur10.jpg'
import imgEur20 from './img/eur20.jpg'
import imgEur50 from './img/eur50.jpg'

import './picker.css'

const Amount = (props) => {
  const icons = {
    5: imgEur5,
    10: imgEur10,
    20: imgEur20,
    50: imgEur50,
  };
  const icon = icons[props.value];

  return (
    <button className="btn btn-amount"
            onClick={() => props.onClick(props.value)}>
      <img src={icon} alt="Amount icon" title="Icon for amount" />
    </button>
  );  
}


const DepositPicker = (props) => {
  return (
    <div className="grid grid-deposit">
      <Amount onClick={props.onClick} value={5} />
      <Amount onClick={props.onClick} value={10} />
      <Amount onClick={props.onClick} value={20} />
      <Amount onClick={props.onClick} value={50} />
    </div>
  );
}

export default DepositPicker;
