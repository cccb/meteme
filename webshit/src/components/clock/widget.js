
/*
 * Just some stupid clock widget
 */


import React from 'react'
import moment from 'moment'

class Clock extends React.Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      time: moment(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((state, props) => ({
        time: moment(),
      }))
    }, 1000);
  }

  componentDidUnmount() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    let format = this.props.format;
    if (!format) {
      format = "MMMM Do YYYY, HH:mm:ss";
    }
    return (
      <span className="clock">
        {this.state.time.format(format)}
      </span>
    );
  }
}


export default Clock;
