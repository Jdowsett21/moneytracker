import React from 'react';
import { getMonthsTransactions } from '../../../actions/transactionActions';
import { connect } from 'react-redux';
import { setMonth } from '../../../actions/monthActions';

function MonthSelector({ month, setMonth }) {
  return (
    <li className='list-group-item '>
      <a
        href='#'
        value={month}
        onClick={() => setMonth(month)}
        className='btn btn-pill m-1 mt-5 py-0 '
        style={{ backgroundColor: '#44c444' }}
      >
        <span className='text-white small-font'>{month}</span>
        {/* <span>{year}</span> */}
      </a>
    </li>
  );
}

export default connect(null, { getMonthsTransactions, setMonth })(
  MonthSelector
);
