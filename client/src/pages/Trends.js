import React , {useEffect}from 'react';
import TrendsLeftColumn from './../components/Trends/TrendsLeftColumn';
import TrendsRightColumn from './../components/Trends/TrendsRightColumn';
import { setGraphData } from '../actions/GraphActions';
import {connect}from 'react-redux'
function Trends({graphs: {timeInfo, category, subCategory  }, accounts: {accountGraphList}, setGraphData}) {
  useEffect(()=> {
    setGraphData(accountGraphList, timeInfo, category, subCategory)
  }, [accountGraphList, timeInfo, subCategory, category])
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
  accounts: state.accounts
});
export default connect(mapStateToProps, {setGraphData})(Trends);
