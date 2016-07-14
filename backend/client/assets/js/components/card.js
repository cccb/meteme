/**
 * Card component
 */

import React from 'react'

export default React.createClass({
  render() {
    var header = undefined;
    if (this.props.header) {
      header = (
        <div className="panel-heading">
          {this.props.header}
        </div>
      );
    }

    var footer = undefined;
    if (this.props.footer) {
      footer = (
        <div className="panel-footer">
          {this.props.footer}
        </div>
      );
    }

    return(
      <div className="panel panel-default">
        {header}
        <div className="panel-body">
          {this.props.children}
        </div>
        {footer}
      </div>
    );
  }
});


