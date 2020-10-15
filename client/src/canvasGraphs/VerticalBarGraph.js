import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';

function VerticalBarGraph({ graphs: { data, format } }) {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  function addSymbols(e) {
    var suffixes = ['', 'K', 'M', 'B'];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
  console.log(data);
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
      valueFormatString: format,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        color: 'darkgreen',
        cornerRadius: 4,
        dataPoints: [{ x: new Date(1998, 5, 3), y: 10 }],
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
