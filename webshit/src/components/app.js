
import React from 'react';
import { createBrowserHistory } from 'history'
import { combineReducers } from 'redux'
import { connectRouter,
         routerMiddleware,
         ConnectedRouter } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { requestsMiddleware } from '../middleware/requests'
import logger from 'redux-logger'

import './app.css';

// Reducers
import statsReducer from './stats/reducer'
import usersReducer from './users/reducer'
import productsReducer from './products/reducer'

// Components
import MainLayout from './layout/main'

export const history = createBrowserHistory()

// Setup app reducer
const rootReducer = combineReducers({
  router: connectRouter(history),
  stats: statsReducer,
  users: usersReducer,
  products: productsReducer,
})


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      logger,
      routerMiddleware(history),
      requestsMiddleware,
    ),
  ),
);

// Pages
const NotFoundPage = () => (
  <div class="page page-404">
    <h1>404 Not Found</h1>
  </div>
)


const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <MainLayout />
        <Route component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;

