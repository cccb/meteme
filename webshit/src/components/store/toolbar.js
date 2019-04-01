import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router'

import { fetchUsers } from '../users/actions'

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


class StoreToolbar extends React.Component {
  render() {
    return (
      <div className="toolbar-content toolbar-store">
        
        <Route path="/store/pick-user"
               render={() => (
                  <ReloadUsersButton />
        )} />
      
      </div>
    );
  }
}


export default connect(
  (state) => ({

  })
)(StoreToolbar);

