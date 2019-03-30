
import React from 'react'
import { connect } from 'react-redux'

import UserPicker from '../users/user-picker'


class PickUser extends React.Component {
  render() {
    return (
      <UserPicker /> 
    );
  }
}


export default connect(
  (state) => ({

  })
)(PickUser);

