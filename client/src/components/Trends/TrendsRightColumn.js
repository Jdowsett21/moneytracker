import React, { useEffect } from 'react';
import DateFormatter from './TrendsRightColumn/DateFormatter';
import FilterBar from './TrendsRightColumn/FilterBar';
import GraphToRender from './../../canvasGraphs/GraphToRender';
import { setGraphData } from '../../actions/GraphActions';
import { connect } from 'react-redux';
import moment from 'moment';
function TrendsRightColumn({ accounts: { accountList }, setGraphData }) {
  useEffect(() => {
    const timeInfo = {
      // fixed solution
      range1: moment('2020-10-31').date(1).subtract(2, 'months').toISOString(),
      range2: moment('2020-10-31').toISOString(),

      // dynamic solution
      // range1: moment().date(1).subtract(2, 'months').toISOString(),
      // range2: moment().toISOString(),
      length: 3,
      unit: 'months',
      format: 'MMM-YYYY',
      label: 'Last 3 months',
    };

    setGraphData(timeInfo, accountList, 'Spending', 'Over Time');
    //eslint-disable-next-line
  }, [accountList]);
  return (
    <div className='col-md-9'>
      <h3>Spending Over Time</h3>
      <DateFormatter />
      <FilterBar />
      <GraphToRender />
    </div>
  );
}
const mapStateToProps = (state) => ({
  accounts: state.accounts,
  time: state.time,
});
export default connect(mapStateToProps, { setGraphData })(TrendsRightColumn);
