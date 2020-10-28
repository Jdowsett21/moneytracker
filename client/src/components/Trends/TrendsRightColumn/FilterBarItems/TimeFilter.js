import React, { useEffect } from 'react';
import { timeFilterArray } from '../TimeFilterArray';
import { filterTransactionsByRange } from '../../../../actions/transactionActions';
import { setTimeInfo } from '../../../../actions/timeActions';
import { connect } from 'react-redux';
function TimeFilter({ time: { timeInfo }, setTimeInfo }) {
  useEffect(() => {
    setTimeInfo(timeFilterArray[4]);

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <label style={{ marginBottom: '0.5rem' }}>From</label>
      {/* eslint-disable-next-line */}
      <a
        className='form-control p-1 pr-4  small-font text-decoration-none'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        id='dropdownMenuButton'
        style={{
          backgroundColor: 'white',
          maxHeight: '24px',
          minWidth: '120px',
        }}
      >
        {timeInfo.label}
      </a>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        {timeFilterArray.map((time) => (
          // eslint-disable-next-line
          <a
            key={time.label}
            onClick={() => {
              setTimeInfo(time);
            }}
            className='dropdown-item small-font'
          >
            {time.label}
          </a>
        ))}
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => ({
  time: state.time,
});

export default connect(mapStatetoProps, {
  filterTransactionsByRange,
  setTimeInfo,
})(TimeFilter);
