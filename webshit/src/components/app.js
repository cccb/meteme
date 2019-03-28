
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

// Components
import MainLayout from './layout/main'

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

