
import React from 'react'

import "./amount-picker.css"

const NumPad = (props) => (
  <div className="frame numpad-frame">
    <div className="numpad">
      <div className="numrow">
        <button className="btn"
                onClick={() => props.onClick(1)}>1</button>
        <button className="btn"
                onClick={() => props.onClick(2)}>2</button>
        <button className="btn"
                onClick={() => props.onClick(3)}>3</button>
      </div>
      <div className="numrow">
        <button className="btn"
                onClick={() => props.onClick(4)}>4</button>
        <button className="btn"
                onClick={() => props.onClick(5)}>5</button>
        <button className="btn"
                onClick={() => props.onClick(6)}>6</button>
      </div>
      <div className="numrow">
        <button className="btn"
                onClick={() => props.onClick(7)}>7</button>
        <button className="btn"
                onClick={() => props.onClick(8)}>8</button>
        <button className="btn"
                onClick={() => props.onClick(9)}>9</button>
      </div>
      <div className="numrow">
        <button className="btn btn-zero"
                onClick={() => props.onClick(0)}>0</button>
        <button className="btn btn-clear"
                onClick={() => props.onClick(-1)}>Clear</button>
      </div>
    </div>
  </div>
);


const AmountView = (props) => {
  const {amount} = props;
  const value = amount / 100;
  const displayValue = value.toFixed(2);

  return (
    <div className="amount">
      <div className="title">Amount:</div>
      <div className="amount-display">
        {displayValue}
      </div>
    </div>
  )
}

export default function AmountPicker(props) {
  const {onChange, amount} = props;

  const updateAmount = (value) => {
    let nextAmount = amount;
    if (value !== -1) {
      nextAmount = (nextAmount * 10) + value;
    } else {
      nextAmount = 0;
    }
    onChange(nextAmount);
  }
  
  return (
    <div className="amount-picker">
      <AmountView amount={amount} />
      <NumPad onClick={updateAmount} />
    </div>
  );
};


