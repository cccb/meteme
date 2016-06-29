
/**
 * Mete98 ME Client Application
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(hashHistory, store);


var Foo = React.createClass({
  render: () => {
    return(<div>Foo</div>);
  }
});

var Bar = React.createClass({
  render: () => {
    return(<div>Bar</div>);
  }
});

var Baz = React.createClass({
  render: () => {
    return(<div>Baz</div>);
  }
});



/**
 * Mete Client 
 */
var MeteClient = React.createClass({
  render() {
    return(
      <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={Baz}>
            <Route path="/foo" component={Foo}/>
            <Route path="/bar" component={Bar}/>
          </Route>
         </Router>
      </Provider>
    );
  }

});


var mountNode = document.getElementById('meteclient');
ReactDOM.render(<MeteClient />, mountNode);

