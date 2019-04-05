
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import UserPicker from '../users/user-picker'


const PickUser = (props) => {
  const {dispatch} = props;

  const onSelectUser = (user) => {
    const userPath = `/store/users/${user.id}`;
    dispatch(push(userPath));    
  }

  return (
    <UserPicker onClick={onSelectUser} /> 
  );
}

export default connect()(PickUser);

