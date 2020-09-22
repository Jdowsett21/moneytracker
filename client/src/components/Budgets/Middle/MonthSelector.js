import React, { useEffect, useState } from 'react';
import { setHoveredMonthColor } from '../../../actions/transactionActions';
import { connect } from 'react-redux';
import { setMonth, setHoveredBudgetMonth } from '../../../actions/monthActions';
import { isUserAuthenticated } from '../../../actions/authActions';
import { useHover } from '../../../utils/useHover';

function MonthSelector({
  listMonth,
  setMonth,
  index,
  setHoveredBudgetMonth,
  setHoveredMonthColor,
  transactions: { hoveredColor, monthNetColor },
  months: { month, hoveredBudgetMonth },
  isUserAuthenticated,
}) {
  const [hover, setHover] = useState(false);

  const settingHover = () => {
    setHoveredBudgetMonth(index) && setHoveredMonthColor(hoveredBudgetMonth);
  };

  const removingHover = () => {
    setHoveredBudgetMonth('');
    setHoveredMonthColor('');
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <li
      className='list-group-item '
      onMouseOver={settingHover}
      onMouseLeave={removingHover}
    >
      <a
        href='#'
        value={listMonth}
        onClick={() => {
          setMonth(listMonth);
          setHoveredMonthColor('');
        }}
        className='btn py-1 px-2 mt-3 '
        style={{
          backgroundColor:
            listMonth === month
              ? monthNetColor
              : listMonth === hoveredBudgetMonth
              ? hoveredColor
              : '#e9ecef',
        }}
      >
        <span className='text-gray extra-small-font'>{listMonth}</span>
      </a>
    </li>
  );
}

const mapStatetoProps = (state) => ({
  months: state.months,
  transactions: state.transactions,
});
export default connect(mapStatetoProps, {
  setHoveredBudgetMonth,
  isUserAuthenticated,
  setHoveredMonthColor,
  setMonth,
})(MonthSelector);