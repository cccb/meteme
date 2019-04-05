

import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import { Route, Redirect } from 'react-router'

import Panel from '../layout/panel'
import Avatar from '../users/avatar'
import ProductPicker from '../products/product-picker'
import UserPicker from '../users/user-picker'
import DepositPicker from './deposit-picker'

import {fetchUser} from '../users/actions'

import "./show-user.css"

const Account = (props) => {
  const user = props.user || {};
  const account = props.user.account;

  if (!account) {
    return null;
  }

return (
    <Panel title="Account">
      <div className="account"> 
        <Avatar user={user} />
        <div className="info">
          <table className="datatable">
            <tbody>
              <tr>
                <td className="key">
                  User:
                </td>
                <td className="value">
                 <b>{user.username}</b>
                </td>
              </tr>
              <tr>
                <td className="key">
                  Balance:
                </td>
                <td className="value">
                 <b>{account.balance}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="actions">
            <Route exact path="/store/users/:userId/donate"
                   render={() => (<>
              <button className="btn"
                      onClick={props.onClickDeposit}>Deposit</button> 
              <button className="btn"
                      onClick={props.onClickTransfer}>Transfer</button>
            </>)} />
            <Route exact path="/store/users/:userId/deposit"
                   render={() => (<>
              <button className="btn"
                      onClick={props.onClickDonate}>Donate</button> 
              <button className="btn"
                      onClick={props.onClickTransfer}>Transfer</button>
            </>)} />

            <Route exact path="/store/users/:userId/transfer"
                   render={() => (<>
              <button className="btn"
                      onClick={props.onClickDonate}>Donate</button> 
              <button className="btn"
                      onClick={props.onClickDeposit}>Deposit</button> 
            </>)} />
          </div>
        </div>
      </div>
    </Panel>
  );
}


class ShowUser extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.userId)); 
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.dispatch(fetchUser(this.props.userId)); 
    }
  }

  buyProduct(product) {
    console.log("Checking out product:", product);
  }

  navigateTo(target) {
    const paths = {
      "deposit": `/store/users/${this.props.userId}/deposit`,
      "transfer": `/store/users/${this.props.userId}/transfer`,
      "donate": `/store/users/${this.props.userId}/donate`,
    }
    this.props.dispatch(replace(paths[target]));
  }

  render() {
    const user = this.props.user || {}; 
    return (
      <div className="user-view">
        <div className="row">
          <div className="col-lg-5">
            <Account user={user}
                     onClickDeposit={() => this.navigateTo("deposit")}
                     onClickDonate={() => this.navigateTo("donate")}
                     onClickTransfer={() => this.navigateTo("transfer")} />
          </div>
        </div>
        <Route exact path="/store/users/:userId" render={() => (
          <Redirect to={`/store/users/${this.props.userId}/donate`} />
        )} />
        <Route exact path="/store/users/:userId/donate" render={() => (
          <ProductPicker onClick={(product) => {this.buyProduct(product)}} />
        )} />
        <Route exact path="/store/users/:userId/transfer" render={() => (
          <UserPicker onClick={(user) => this.chooseUser(user)} /> 
        )} />
        <Route exact path="/store/users/:userId/deposit" render={() => (
          <DepositPicker onClick={(amount) => {this.deposit(amount)}} />
        )} />
      </div>
    );
  }
}


export default connect(
  (state, ownProps) => ({
    userId: ownProps.match.params.userId,
    user: state.users.current,
  })
)(ShowUser);

