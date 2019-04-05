
import React from 'react'

import "./panel.css"


export default function Panel(props) {
  let panelClassName = "panel " + props.className;

  return (
    <div className={panelClassName}>
      <div className="panel-title-container">
        <span className="panel-title">
          {props.title}
        </span>
      </div>
      <div className="panel-content">
        {props.children}
      </div>
    </div>
  );
}

