
import React from 'react'
import {connect} from 'react-redux'

import UsersGrid from './grid'

import {fetchUsers} from './actions'

class UsersPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());

  }

  render() {
    return (
      <div className="users-page">
        <UsersGrid users={this.props.users} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    users: state.users.all,
  })
)(UsersPage);

