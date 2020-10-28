import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { connect } from 'react-redux';

function DoughnutChart({ graphs: { data } }) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const other =
    data.filter((d) => d.y > 1).length === data.length
      ? console.log('hello')
      : console.log('bue');
  // {
  //     label: 'Other',
  //     y: data.reduce((acc, d) => {
  //       if (d.y < 1) {
  //         return d.y + acc;
  //       }
  //       return acc;
  //     }, 0),
  //   }
  // : { label: '', y: '' };

  const options = {
    animationEnabled: true,

    data: [
      {
        type: 'doughnut',
        startAngle: 90,
        tootTipContent: '<b>{label}</b>: {y}%',
        indexLabelFontSize: 12,
        innerRadius: '30%',
        indexLabel: '{label}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [...data.filter((d) => d.y > 1)],
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
export default connect(mapStateToProps)(DoughnutChart);
