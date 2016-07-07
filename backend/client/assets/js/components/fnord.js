
import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'


class Incor extends Component {
  render() {
    return(
      <button onClick={this.props.onClick}>Moar!</button>
    );
  }
}


class Fnordor extends Component {
  render() {
    return(
      <div>
        <p>Fnord: {this.props.fnord}</p>
        <Incor onClick={this.props.incClick} />
      </div>
    )
  }
}

Fnordor.propTypes = {
  fnord: PropTypes.number.isRequired,
  incClick: PropTypes.func.isRequired
};

export var FnordView = connect(
  (state) => {
    return {
      fnord: state.fnord
    }
  },
  (dispatch) => {
    return {
      incClick: () => {
        dispatch({
          type: 'ADD_FNORD'
        });
      }
    }
  }
)(Fnordor);

