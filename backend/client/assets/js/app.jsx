
/**
 * Mete98 ME Client Application
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


import combinedReducer from './reducers'

import StatsPage from './components/stats-page'


// Setup logger
const loggerMiddleware = createLogger()

// Setup client
const store = createStore(combinedReducer, applyMiddleware(
  thunkMiddleware //, loggerMiddleware
));

const history = syncHistoryWithStore(hashHistory, store);


var MainLayout = React.createClass({
  render: function() {
    return(
      <div>
        <main className="container-main">
          {this.props.children}
        </main>
        <footer>
         (c) 1996-1999 Metigsoft Corp. All rights reseved.
        </footer>
       </div>
    );
  }
})


/**
 * Mete Client 
 */
var MeteClient = React.createClass({
  render() {
    return(
      <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={MainLayout}>
              <IndexRoute component={StatsPage} />
            </Route>
         </Router>
      </Provider>
    );
  }

});

var mountNode = document.getElementById('meteclient');
ReactDOM.render(<MeteClient />, mountNode);

