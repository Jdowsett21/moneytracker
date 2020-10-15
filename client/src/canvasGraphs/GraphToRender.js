import React from 'react';
import LineGraph from './LineGraph';
import HorizontalBarGraph from './HorizontalBarGraph';
import StackedBarComboLineGraph from './StackedBarComboLineGraph';
import PieChart from './PieChart';
import VerticalBarGraph from './VerticalBarGraph';
import { connect } from 'react-redux';
import moment from 'moment';
function GraphToRender({ graphs: { graphType } }) {
  return (
    <div className='pt-5'>
      {graphType === 'line' ? (
        <LineGraph />
      ) : graphType === 'horizontalBar' ? (
        <HorizontalBarGraph />
      ) : graphType === 'Donut' ? (
        <PieChart />
      ) : graphType === 'combo' ? (
        <StackedBarComboLineGraph />
      ) : (
        <VerticalBarGraph />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  graphs: state.graphs,
});
export default connect(mapStateToProps)(GraphToRender);
