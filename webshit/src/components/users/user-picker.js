
/*
 * Pick a user
 */
import React from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from './actions'


const User = (props) => (
  <div className="user-picker-user"
       onClick={props.onClick}>
    <div className="avatar">
      <img  alt="Avatar"
            title="Profile Picture"
            src={props.user.account.avatar} />
    </div>
    <div className="username">
      {props.user.username}
    </div>
  </div>
)



class UserPicker extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div className="user-picker user-picker-grid">
        {this.props.users.map( user => (
          <User onClick={this.props.onClick}
                user={user} />
        ))}
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

