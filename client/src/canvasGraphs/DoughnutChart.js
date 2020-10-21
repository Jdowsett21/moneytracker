import React from 'react';
import CanvasJSReact from './canvasjs.react';
import {connect}from'react-redux'
function DoughnutChart({ graphs: { data, unit } }) {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const other= {
    label: 'Other',
y:data.reduce((acc, d)=> {
  if(d.y < 1){
    return {
      y:  d.y+ acc
    }  
  }
},0)
  }

 
  
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Website Traffic Sources',
    },
    data: [
      {
        type: 'pie',
        startAngle: 90,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: [...data.filter((d)=> d.y >1), other],
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
