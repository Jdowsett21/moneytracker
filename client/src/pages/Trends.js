import React, { useEffect } from 'react';
import TrendsLeftColumn from './../components/Trends/TrendsLeftColumn';
import TrendsRightColumn from './../components/Trends/TrendsRightColumn';
import { setGraphData, setGraphType } from '../actions/GraphActions';
import { connect } from 'react-redux';
function Trends({
  graphs: { category, subCategory },
  accounts: { accountGraphList },
  time: { timeInfo },
  setGraphData,
}) {
  useEffect(() => {
    setGraphData(timeInfo, accountGraphList, category, subCategory);
    //eslint-disable-next-line
  }, [accountGraphList, timeInfo]);
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <TrendsLeftColumn />
          <TrendsRightColumn />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  graphs: state.graphs,
  accounts: state.accounts,
  time: state.time,
});
export default connect(mapStateToProps, { setGraphData })(Trends);
