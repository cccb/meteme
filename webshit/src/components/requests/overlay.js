
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


const RequestError = (props) => {
  const {error} = props;
  if (!error) {
    return null;
  }

  let errorMsg = "";
  if (typeof(error) === "object") {
    if (error.response) {
      if (typeof(error.response.data) === "object") {
        errorMsg = error.response.data.detail;
      } else {
        errorMsg = error.response.statusText;
      }
    }
  }

  return (
    <div className="error">
      <h1>Error!</h1>
      <p>{errorMsg}</p>
    </div>
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

  if (isFinished && !error) {
    useEffect(() => {
      const timer = setTimeout(() => {
        closeModal();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    });
  }


  return (
    <div className="request-overlay">
      <div className="request-overlay-bg" />
      
      <div className="overlay-modal">
        <div className="overlay-content">
          <div className="overlay-body">
            {isLoading && 
              <div className="action">
                 <LoadingIndicator /> Please wait...
              </div>
            }
            {isFinished && !error && 
              <div className="action text-success">
                Success! 
              </div>
            }
            <RequestError error={error} />
          </div>
          {isFinished && error &&
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

