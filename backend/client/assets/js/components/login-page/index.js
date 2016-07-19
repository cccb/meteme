
/**
 * Authentication / Login Page
 */

import React          from 'react'
import { Component }  from 'react'
import { connect }    from 'react-redux'

// Components
import Nav  from '../nav'
import Card from '../card'


// Login Page
class LoginPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <Nav />


        </div /* end col */>
        <div className="col-md-5">
        </div>
      </div>
    );
  }
}


// Container
export default connect(
  (state) => {
    return {
    };
  },
  (dispatch) => {
    return {
    };
  }
)(LoginPage);

