
import React from 'react'
import {connect} from 'react-redux'

import UserPicker from '../users/user-picker'
import AmountPicker from './amount-picker'

import {transferSetAmount} from './actions'

const TransferView = (props) => {
  const {onClick, transferAmount} = props;

  const setAmount = (amount) => {
    props.dispatch(transferSetAmount(amount));
  }

  return (
    <div className="transfer">
      <div className="col-md-5">
        <AmountPicker amount={transferAmount} onChange={setAmount} />
      </div>
      <div className="col-md-7">
        <UserPicker onClick={(user) => onClick(user, transferAmount/100)} /> 
      </div>
    </div>
  );
}


export default connect(
  (state) => ({
    transferAmount: state.store.transferAmount,
  })
)(TransferView);

