import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';

function HorizontalBarGraph({ graphs: { data } }) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    axisY: {
      title: 'Bounce Rate',
      suffix: '%',
    },
    axisX: {
      title: 'Week of Year',
      prefix: 'W',
      interval: 2,
    },
    data: [
      {
        type: 'line',
        toolTipContent: 'Week {x}: {y}%',
        dataPoints: data,
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
export default connect(mapStateToProps)(HorizontalBarGraph);
