import React, { useEffect } from 'react';
import {
  getTransactions,
  setMonthNet,
  setMonthTotals,
  setMonthNetPercent,
  setSixMonthNet,
  setSixMonthMax,
} from '../../../../actions/transactionActions';
import { connect } from 'react-redux';
import MonthTable from '../MonthlyGraph/MonthTable';
import moment from 'moment';
import MonthItem from './MonthItem';
function MonthlyNetGraph({
  getTransactions,
  setMonthTotals,
  setSixMonthNet,
  setSixMonthMax,
  months: { hoveredMonth },
  transactions: {
    monthGraphNet,
    monthIncome,
    monthDebt,
    sixMonthNetTotals,
    sixMonthMax,
    transactionList,
  },
}) {
  const months = [
    moment().subtract(5, 'months').format('MMM'),
    moment().subtract(4, 'months').format('MMM'),
    moment().subtract(3, 'months').format('MMM'),
    moment().subtract(2, 'months').format('MMM'),
    moment().subtract(1, 'months').format('MMM'),
    moment().format('MMM'),
  ];

  useEffect(() => {
    getTransactions();

    if (transactionList && transactionList.length > 0) {
      setSixMonthNet();
      setSixMonthMax();
      setMonthTotals(hoveredMonth);
    }
    // eslint-disable-next-line
  }, [transactionList.length, hoveredMonth]);

  return (
    <React.Fragment>
      <h2 className='small-font month-header'>{`Net Income ${hoveredMonth}`}</h2>
      <ul className='vertical-bar'>
        {months.map((month, index) => (
          <MonthItem
            index={index}
            key={month}
            type='small-font month'
            monthNet={sixMonthNetTotals && sixMonthNetTotals[index]}
            sixMonthMax={sixMonthMax}
            month={month}
          ></MonthItem>
        ))}
        <li className='graphLines small-font'>
          <div className='graphTop'>
            <aside>
              <p>{`$${sixMonthMax}`}</p>
            </aside>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className='graphMiddle'>
            <aside>
              <p>0</p>
            </aside>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className='graphBottom'>
            <aside>
              <p>{`$${-1 * sixMonthMax}`}</p>
            </aside>
          </div>
        </li>
      </ul>
      <MonthTable
        monthDebt={monthDebt}
        monthIncome={monthIncome}
        monthNet={monthGraphNet}
      />
    </React.Fragment>
  );
}

const MapStatetoProps = (state) => ({
  months: state.months,
  transactions: state.transactions,
  accounts: state.accounts,
});
export default connect(MapStatetoProps, {
  getTransactions,
  setMonthNet,
  setMonthTotals,
  setMonthNetPercent,
  setSixMonthNet,
  setSixMonthMax,
})(MonthlyNetGraph);
