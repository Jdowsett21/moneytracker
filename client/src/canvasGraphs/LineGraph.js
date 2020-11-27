import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';
import moment from 'moment';
function LineGraph({ graphs: { data3, data4 } }) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    axisX: {
      stripLines: [
        {
          startValue: 21,
          // dynamic solution
          // Number(moment().date())
          endValue: 21.05,
          // dynamic solution
          // Number(moment().date()) + 0.05
          color: 'lightgrey',
        },
      ],
    },
    axisY: {
      gridThickness: 0,
      includeZero: true,
    },
    data: [
      {
        type: 'line',
        toolTipContent: ' {x}: {y}',
        markerType: 'none',
        dataPoints: data3,
        color: 'lightgrey',
        lineDashType: 'shortDot',
      },
      {
        type: 'line',
        toolTipContent: '{x}: {y}',
        color: '#3ab46d',
        markerType: 'none',
        dataPoints: data4,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  graphs: state.graphs,
});
export default connect(mapStateToProps)(LineGraph);
