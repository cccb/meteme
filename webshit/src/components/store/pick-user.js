
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import UserPicker from '../users/user-picker'


class PickUser extends React.Component {

  chooseUser(user) {
    const userPath = `/store/users/${user.id}`;
    this.props.dispatch(push(userPath));    
  }

  render() {
    return (
      <UserPicker onClick={(user) => this.chooseUser(user)} /> 
    );
  }
}


export default connect(
  (state) => ({

  })
)(PickUser);

