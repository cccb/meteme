
/*
 * Pick a user
 */
import React from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from './actions'

// Assets
import defaultAvatar from './img/default_avatar.png'
import "./users.css"


const Avatar = (props) => {

  let picture = props.picture;
  if (!picture) {
    picture = defaultAvatar;
  }

  return (
    <div className="avatar">
      <img alt="Avatar"
           title="Profile Picture"
           src={picture} />
    </div>
  );
}

const User = (props) => (
  <div className="user-picker-user"
       onClick={props.onClick}>
    <Avatar picture={props.user.account.avatar} />
    <div className="username">
      {props.user.username}
    </div>
  </div>
);


class UserPicker extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div className="user-picker user-picker-grid">
        {this.props.users.map( user => (
          <User key={user.id}
                onClick={() => this.props.onClick(user)}
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

