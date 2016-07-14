
import React from 'react'
import { connect } from 'react-redux'

import Card from '../card'
import Highcharts from 'react-highcharts'

const GraphView = React.createClass({
  render() {

    var data = [];
    var config = {
      title: false,
      xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
      yAxis: {
        title: {
           text: 'Konsum'
        },
        min: 0
      },
      series: this.props.series,
    };

    return (
      <Card>
        <Highcharts config={config} />
      </Card>
    );
  }
});


// Create container
export default connect(
  (state) => {
    var seriesData = {};

    // Prepare series from transactions
    state.transactions.all.forEach(function(transaction) {
      var product = transaction.productName;
      if (!product) {
        return; // Skip transfers and deposits
      }

      // Create new series for product
      if (!seriesData[product]) {
        seriesData[product] = {
          'donations': {},
          'times': []
        };
      }

      // Count donations 
      var key = transaction.createdAt.getFullYear() + ',' +
                transaction.createdAt.getMonth() + ',' +
                transaction.createdAt.getDate();

      if (!seriesData[product]['donations'][key]) {
        seriesData[product]['donations'][key] = 0;
        seriesData[product]['times'].push(key);
      }
      seriesData[product]['donations'][key] += 1;
    });

    // Make timeseries from aggregated stats
    var series = [];
    for (var product in seriesData) {
      var timeseries = [];
      var times = seriesData[product]['times'];
      times.forEach(function(timestr) {
        var tokens = timestr.split(',');
        var date = Date.UTC(tokens[0], tokens[1], tokens[2]);
        var donations = seriesData[product]['donations'][timestr];
        timeseries.push([date, donations]);
      });
      var s = {
        name: product,
        data: timeseries,
        tooltip: {
          valueDecimals: 2
        }
      };
      series.push(s);
    }

    return {
      series: series
    }
  }
)(GraphView);


