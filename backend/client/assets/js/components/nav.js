
import React from 'react'


export default React.createClass({
  render: function() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top navbar-main">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#navbar"
                    aria-expanded="false"
                    aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Mete98 ME
              <span className="trade">TM</span></a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav pull-right">
              <li><a href="">Logout</a></li>
            </ul>
          </div>
      </nav>
    );
  }
});




