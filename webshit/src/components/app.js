
import React from 'react';
import { createBrowserHistory } from 'history'
import { combineReducers } from 'redux'
import { connectRouter,
         routerMiddleware,
         ConnectedRouter } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4

import './app.css';

export const history = createBrowserHistory()

// Setup app reducer
const rootReducer = combineReducers({
  router: connectRouter(history),
})


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);


const App = () => (
  <div className="app">
    Mete95 Millenials Edition
  </div>
);

export default App;

