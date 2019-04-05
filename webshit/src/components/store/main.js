import React from 'react'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router'

import PickUser from './pick-user'
import ShowUser from './show-user'

const StoreMain = (props) => {
  return (
    <div className="store store-main">
      <Route exact path="/store" render={() => (
        <Redirect to="/store/pick-user" />
      )} />
      
      <Route path="/store/pick-user"
             component={PickUser} />

      <Route path="/store/users/:userId"
             component={ShowUser} />
    
    </div>
  );
}

export default connect(
  (state) => ({

  })
)(StoreMain);

