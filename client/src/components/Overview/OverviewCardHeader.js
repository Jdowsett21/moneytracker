import React from 'react';

function OverviewCardHeader({ title }) {
  return (
    <React.Fragment>
      <small className='font-medium' style={{ float: 'left' }}>
        {title}
      </small>
      {/* <i className='fas fa-cog' style={{ float: 'right' }}></i> */}
    </React.Fragment>
  );
}

export default OverviewCardHeader;
