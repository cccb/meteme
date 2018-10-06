
import React from 'react'

import { Route, Switch } from 'react-router'

import Footer from '../components/layout/footer'

import UsersPage from '../components/users/page'

// Layout Main
export default (props) => {
  return(
    <div className="page">
      <main>
        <Switch>
          <Route exact path="/" component={UsersPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

