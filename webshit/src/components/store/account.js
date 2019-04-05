import React from 'react'

import { Route } from 'react-router'

import Panel from '../layout/panel'
import Avatar from '../users/avatar'

export default function Account(props) {
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
