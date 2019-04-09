
/*
 * Request overlay view: Blocks interaction with the UI.
 * Display the error if anything went wrong.
 */

import React from 'react'
import {connect} from 'react-redux'


const Overlay = (props) => {
  return (
    <div className="request-overlay">
      
      <div className="modal">
        <div className="modal-dialog" role="document">
          Requesting...
        </div>
      </div>

    </div>
  );
}

export const connect(
  (state) => ({

  })
)(Overlay);

