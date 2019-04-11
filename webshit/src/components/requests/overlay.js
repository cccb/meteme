
/*
 * Request overlay view: Blocks interaction with the UI.
 * Display the error if anything went wrong.
 */

import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {dismissOverlay} from './actions'

import './overlay.css'

const loadingIndicatorForms = [
  '[-]',
  '[\\]',
  '[|]',
  '[/]',
];

const LoadingIndicator = (props) => {
  const [idx, setIdx] = useState(0);
  let nextIdx = idx;

  useEffect(() => {
    const timer = setInterval(() => {
      nextIdx = (nextIdx + 1) % loadingIndicatorForms.length;
      setIdx(nextIdx);
    }, 1000/15);
  
    return () => {
      clearInterval(timer); 
    };
  }, []);
  
  return (
    <span className="loading-indicator">{loadingIndicatorForms[idx]}</span>
  );
}


const Overlay = (props) => {
  const {dispatch,
         showModal,
         error,
         isFinished,
         isLoading} = props;

  if (!showModal) {
    return null;
  }

  const closeModal = () => {
    dispatch(dismissOverlay()); 
  }

  return (
    <div className="request-overlay">
      <div className="request-overlay-bg" />
      
      <div className="overlay-modal">
        <div className="overlay-content">
          <div className="overlay-body">
            <div className="action">
               <LoadingIndicator /> Please wait...
            </div>
          </div>
          {!isLoading &&
            <div className="overlay-actions">
              <button onClick={closeModal}
                      className="btn btn-lg">Close</button>
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default connect(
  (state) => ({
    showModal:  state.requests.showModal,
    isLoading:  state.requests.isLoading,
    isFinished: state.requests.isFinished,
    error:      state.requests.error,
  })
)(Overlay);

