import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';

function LineGraph({ graphs: { data3, data4 } }) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    animationEnabled: true,
    data: [
      {
        type: 'line',
        toolTipContent: ' {x}: {y}',
        color: 'black',
        dataPoints: data3,
      },
      {
        type: 'line',
        toolTipContent: '{x}: {y}',
        color: 'lightgrey',
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
