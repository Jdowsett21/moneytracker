import React from 'react';
import LineGraph from '../canvasGraphs/LineGraph';
import TrendsLeftColumn from './../components/Trends/TrendsLeftColumn';
import TrendsRightColumn from './../components/Trends/TrendsRightColumn';

function Trends() {
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

export default Trends;
