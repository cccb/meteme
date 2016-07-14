
import React from 'react'
import Card from './card'

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
              <li className="active">
                <a href="#">Stats</a>
              </li>
              <li className="disabled"><a href="#">My Account</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

