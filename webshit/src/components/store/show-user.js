

import React from 'react'
import { connect } from 'react-redux'
// import { push } from 'connected-react-router'

import Panel from '../layout/panel'
import Avatar from '../users/avatar'
import ProductPicker from '../products/product-picker'

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
        <Avatar picture={account.avatar} />
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
            <button className="btn">Deposit</button> 
            <button className="btn">Transfer</button>
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

  render() {
    const user = this.props.user || {}; 
    return (
      <div className="user-view">
        <div className="">
          <div className="col-lg-5">
            <Account user={user} />
          </div>
        </div>
        <ProductPicker onSelect={(product) => {this.buyProduct(product)}} />
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

