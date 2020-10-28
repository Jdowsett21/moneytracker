import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';

function StackedBarComboLineGraph({ graphs: { data, data1, data2, unit } }) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    axisX: {
      labelFontSize: 10,
      interval: 1,
      intervalType: (unit = 'months' ? 'month' : 'day'),
    },
    axisY: {
      stripLines: [
        {
          value: 0,
          showOnTop: true,
          color: 'gray',
          thickness: 1,
        },
      ],
      gridThickness: 0,
      labelFontSize: 10,
      includeZero: true,
      valueFormatString: '$#,##0',
    },
    toolTip: {
      shared: false,
    },

    data: [
      {
        type: 'stackedColumn',
        name: 'Income',
        color: '#0ac775',
        dataPoints: data,
      },
      {
        type: 'stackedColumn',
        name: 'Spending',
        color: '#f24965',
        dataPoints: data1,
      },
      {
        type: 'line',
        name: 'Net Income',
        color: 'darkgrey',
        dataPoints: data2,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  graphs: state.graphs,
});
export default connect(mapStateToProps)(StackedBarComboLineGraph);
