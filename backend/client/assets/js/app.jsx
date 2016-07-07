
/**
 * Mete98 ME Client Application
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import combinedReducer from './reducers'

import {FnordView} from './components/fnord'
import Nav from './components/nav'

// Setup client
const store = createStore(combinedReducer);
const history = syncHistoryWithStore(hashHistory, store);


window.setInterval(function() {
  store.dispatch({
    type: 'ADD_FNORD'
  });
}, 1000);



var MainLayout = React.createClass({
  render: function() {
    return(
      <div>
        <Nav />
        <main>
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
           </Route>
         </Router>
      </Provider>
    );
  }

});

              // <IndexRoute component={Baz} />

var mountNode = document.getElementById('meteclient');
ReactDOM.render(<MeteClient />, mountNode);

