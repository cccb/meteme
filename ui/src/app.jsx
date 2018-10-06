
/**
 * MetemeUI                           v.2.0.0
 * ------------------------------------------
 *
 * @author Matthias Hannig <matthias@berlin.ccc.de>
 */

import axios     from 'axios'

import React     from 'react'

import {Component} from 'react'

// Redux
import {createStore,
        applyMiddleware,
        compose} from 'redux'
import {Provider} from 'react-redux'

// Router
import createBrowserHistory from 'history/createBrowserHistory'

import {ConnectedRouter,
        connectRouter,
        routerMiddleware } from 'connected-react-router'

// Components
import LayoutMain from './layouts/main'

// Middlewares
import {createLogger}  from 'redux-logger'
import fetchMiddleware from './fetch/middleware'

// Reducer
import rootReducer from './reducer'

// Setup axios to use django xsrf token
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Setup routing
const browserHistory = createBrowserHistory({
    basename: '/ui',
    forceRefresh: false,
    keyLength: 6,
});

// Create router middleware
// eslint-disable-next-line
const appRouterMiddleware = routerMiddleware(browserHistory);

// Setup application
const loggerMiddleware = createLogger();
const store = createStore(
  connectRouter(browserHistory)(rootReducer),
  compose(
      applyMiddleware(
        appRouterMiddleware,
        loggerMiddleware,
        fetchMiddleware,
      )
  )
);

// Create App
export default class AliceApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
          <LayoutMain />
        </ConnectedRouter>
      </Provider>
    );
  }
}
