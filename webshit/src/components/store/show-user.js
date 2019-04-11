

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { Route, Redirect } from 'react-router'

import Account from './account'
import ProductPicker from '../products/product-picker'
import UserPicker from '../users/user-picker'
import DepositPicker from '../deposit/picker'

import {fetchUser} from '../users/actions'
import {deposit, purchase, mainScreenTransitionSuccess} from './actions'

import "./show-user.css"


const ShowUser = (props) => {
  const {
    dispatch,
    user,
    userId,
    needsMainScreenTransition,
  } = props;

  // Handlers
  const buyProduct = (product) => {
    dispatch(purchase(user, product));
  }

  const navigateTo = (target) => {
    const paths = {
      "deposit": `/store/users/${userId}/deposit`,
      "transfer": `/store/users/${userId}/transfer`,
      "donate": `/store/users/${userId}/donate`,
    }

    dispatch(replace(paths[target]));
  }

  const chooseTransferUser = (transferUser) => {
    console.log("Choosing transfer user:", transferUser);
  }

  const depositAmount = (amount) => {
    dispatch(deposit(user, amount));
  }

  // Load user data
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);


  console.log("Need", needsMainScreenTransition);
  useEffect(() => {
    let timer = null;
    if (needsMainScreenTransition) {
      timer = setTimeout(() => {
        dispatch(mainScreenTransitionSuccess());
        dispatch(replace("/"));
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  });

  
  // Render Store
  return (
    <div className="user-view">
      <div className="row">
        <div className="col-lg-5">
          <Account user={user}
                   onClickDeposit={() => navigateTo("deposit")}
                   onClickDonate={() => navigateTo("donate")}
                   onClickTransfer={() => navigateTo("transfer")} />
        </div>
      </div>

      <Route exact path="/store/users/:userId" render={() => (
        <Redirect to={`/store/users/${props.userId}/donate`} />
      )} />
      <Route exact path="/store/users/:userId/donate" render={() => (
        <ProductPicker onClick={buyProduct} />
      )} />
      <Route exact path="/store/users/:userId/transfer" render={() => (
        <UserPicker onClick={chooseTransferUser} /> 
      )} />
      <Route exact path="/store/users/:userId/deposit" render={() => (
        <DepositPicker onClick={depositAmount} />
      )} />
    </div>
  );
}


export default connect(
  (state, ownProps) => ({
    needsMainScreenTransition: state.store.needsMainScreenTransition,
    userId: ownProps.match.params.userId,
    user: state.users.current,
  })
)(ShowUser);

