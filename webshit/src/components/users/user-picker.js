
/*
 * Pick a user
 */
import React from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from './actions'


class UserPicker extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div className="user-picker user-picker-grid">
        
      </div>
    );
  }
}

export default connect(
  (state) => ({
    users: state.users.all,
    isLoading: state.users.isLoading,
    error: state.users.error,
  })
)(UserPicker);

