
/*
 * Just some stupid clock widget
 */


import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Clock(props) {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());  
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [props.format]);

  // Render clock
  let format = props.format;
  if (!format) {
    format = "MMMM Do YYYY, HH:mm:ss";
  }
  return (
    <span className="clock">
      {time.format(format)}
    </span>
  );
}


