
import React from 'react'


export default React.createClass({
  monthNames: [
    'Januar', 'Februar', 'März', 'April',
    'Mai', 'Juni', 'Juli', 'August', 'September',
    'Oktober', 'November', 'Dezember'
  ],

  render() {
    var date = this.props.date;
    var monthName = this.monthNames[date.getMonth()];
    var year = date.getFullYear();

    return (
      <span>{monthName} {year}</span>
    );
  }
});

