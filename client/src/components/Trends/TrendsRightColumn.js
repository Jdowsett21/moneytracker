import React from 'react';
import DateFormatter from './TrendsRightColumn/DateFormatter';
import FilterBar from './TrendsRightColumn/FilterBar';
import GraphToRender from './../../canvasGraphs/GraphToRender';

function TrendsRightColumn() {
  return (
    <div className='col-md-7'>
      <h3>Spending Over Time</h3>
      <DateFormatter />
      <FilterBar />
      <GraphToRender />
    </div>
  );
}

export default TrendsRightColumn;
