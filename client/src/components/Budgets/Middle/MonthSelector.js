import React, { useEffect } from 'react';
import { setHoveredMonthColor } from '../../../actions/transactionActions';
import { connect } from 'react-redux';
import { setMonth, setHoveredBudgetMonth } from '../../../actions/timeActions';
import { isUserAuthenticated } from '../../../actions/authActions';

function MonthSelector({
  dateInfo,
  setMonth,
  index,
  setHoveredBudgetMonth,
  setHoveredMonthColor,
  transactions: { hoveredColor, monthNetColor },
  time: { month, hoveredBudgetMonth, date1, date2 },
  isUserAuthenticated,
}) {
  const settingHover = () => {
    setHoveredBudgetMonth(index) &&
      setHoveredMonthColor(hoveredBudgetMonth, date1, date2);
  };

  const removingHover = () => {
    setHoveredBudgetMonth('');
    setHoveredMonthColor('', '', '');
  };

  useEffect(() => {
    isUserAuthenticated();
    //eslint-disable-next-line
  }, []);

  return (
    <li
      className='list-group-item '
      onMouseOver={settingHover}
      onMouseLeave={removingHover}
    >
      {/* eslint-disable-next-line */}
      <a
        href='#'
        value={dateInfo.label}
        onClick={() => {
          setMonth(dateInfo);
          setHoveredMonthColor('', dateInfo.dataFilter1, dateInfo.dataFilter2);
        }}
        className='btn py-1 px-2 mt-3 '
        style={{
          backgroundColor:
            dateInfo.label === month
              ? monthNetColor
              : dateInfo.label === hoveredBudgetMonth
              ? hoveredColor
              : '#e9ecef',
        }}
      >
        <span className='text-gray extra-small-font'>{dateInfo.label}</span>
      </a>
    </li>
  );
}

const mapStatetoProps = (state) => ({
  time: state.time,
  transactions: state.transactions,
});
export default connect(mapStatetoProps, {
  setHoveredBudgetMonth,
  isUserAuthenticated,
  setHoveredMonthColor,
  setMonth,
})(MonthSelector);
