
/**
 * Mete98 ME Client Application
 */

import React, { PropTypes } from 'react';

import ReactDOM from 'react-dom';

import { createStore,
         combineReducers,
         applyMiddleware } from 'redux'

import { Provider,
         connect } from 'react-redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { Router,
         Route,
         IndexRoute,
         hashHistory,
         Link } from 'react-router'

import { syncHistoryWithStore,
         routerReducer,
         routerMiddleware as createRouterMiddleware
       } from 'react-router-redux'


import combinedReducer from './reducers'

// Components
import StatsPage from './components/stats-page'

// Actions
import { syncSession } from './actions/auth';

// Setup logger
const loggerMiddleware = createLogger();
const routerMiddleware = createRouterMiddleware(hashHistory);

// Setup client
const store = createStore(combinedReducer, applyMiddleware(
  routerMiddleware,
  thunkMiddleware,
  loggerMiddleware
));

const history = syncHistoryWithStore(hashHistory, store);


const MainLayout = React.createClass({
  componentDidMount() {
    const {
      dispatch
    } = this.props;

    dispatch(syncSession());
  },

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

const MainLayoutContainer = connect(
  (state) => {
    return {};
  }
)(MainLayout);

/**
 * Mete Client 
 */
var MeteClient = React.createClass({
  render() {
    return(
      <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={MainLayoutContainer}>
              <IndexRoute component={StatsPage} />
              <Route component={StatsPage} path="stats" />
            </Route>
         </Router>
      </Provider>
    );
  }

});

var mountNode = document.getElementById('meteclient');
ReactDOM.render(<MeteClient />, mountNode);

