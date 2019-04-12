import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router'
import { goBack } from 'connected-react-router'

import { fetchUsers } from '../users/actions'

const _BackButton = (props) => (
  <button onClick={props.goBack}
          className="btn btn-back">
    Back 
  </button>
);

const BackButton = connect(
  (state) => ({}),
  (dispatch) => ({
    "goBack": () => {
      dispatch(goBack());
    }
  })
)(_BackButton);


const _ReloadUserButton = (props) => (
  <button onClick={props.refreshUsers}
          className="btn btn-reload-users">
    Reload
  </button>
);

const ReloadUsersButton = connect(
  (state) => ({

  }),
  (dispatch) => ({
    refreshUsers: () => {
      dispatch(fetchUsers());
    }
  }),
)(_ReloadUserButton);


const StoreToolbar = (props) => {
  return (
    <div className="toolbar-content toolbar-store">
      
      <Route path="/store/pick-user"
             render={() => (
                <ReloadUsersButton />
      )} />

      <Route path="/store/users/:userId"
             render={() => (
                <BackButton />
      )} />
    
    </div>
  );
}


export default connect(
  (state) => ({

  })
)(StoreToolbar);

