import React from 'react';
import CanvasJSReact from './canvasjs.react';
import {connect}from'react-redux'
function VerticalBarGraph({ graphs: { data, unit } }) {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  
  const options = {
    animationEnabled: true,

    axisY: {
      includeZero: true,
      gridThickness: 0,
      labelFontSize: 10,
      // labelFormatter: addSymbols,
      valueFormatString: '$#,##0.00',
    },
    axisX: {
      labelFontSize: 10,
interval: 1,
intervalType: unit

    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        color: 'darkgreen',
        cornerRadius: 4,
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
export default connect(mapStateToProps)(VerticalBarGraph);
