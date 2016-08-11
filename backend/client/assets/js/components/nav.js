
import React from 'react'
import Card from './card'

import activeComponent from 'react-router-active-component'

// Create Nav Link
let NavLink = activeComponent('li')

export default React.createClass({
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <p className="logo">Mete98 ME <span className="trade">TM</span></p>
            </a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/stats">Stats</NavLink>
              <NavLink to="/account" className="disabled">
                My Account
              </NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="/login">Login</NavLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

