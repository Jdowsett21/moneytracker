import React, { useEffect } from 'react';
import {
  getTransactions,
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
  time: { hoveredMonth, date1, date2 },
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
    {
      label: moment().subtract(5, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(5, 'months').toISOString(),
      dataFilter2: moment()
        .date(1)
        .subtract(1, 'days')
        .subtract(4, 'months')
        .toISOString(),
    },
    {
      label: moment().subtract(4, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(4, 'months').toISOString(),
      dataFilter2: moment()
        .date(1)
        .subtract(1, 'days')
        .subtract(3, 'months')
        .toISOString(),
    },
    {
      label: moment().subtract(3, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(3, 'months').toISOString(),
      dataFilter2: moment()
        .date(1)
        .subtract(1, 'days')
        .subtract(2, 'months')
        .toISOString(),
    },
    {
      label: moment().subtract(2, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(2, 'months').toISOString(),
      dataFilter2: moment()
        .date(1)
        .subtract(1, 'months')
        .subtract(1, 'days')
        .toISOString(),
    },
    {
      label: moment().subtract(1, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(1, 'months').toISOString(),
      dataFilter2: moment().date(1).subtract(1, 'days').toISOString(),
    },
    {
      label: moment().subtract(0, 'months').format('MMM'),
      dataFilter1: moment().date(1).subtract(0, 'months').toISOString(),
      dataFilter2: moment()
        .date(1)
        .add(1, 'months')
        .subtract(1, 'days')
        .toISOString(),
    },
  ];

  useEffect(() => {
    getTransactions();

    if (transactionList && transactionList.length > 0) {
      setSixMonthNet();
      setSixMonthMax();
      setMonthTotals(date1, date2);
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
            key={month.label}
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
  time: state.time,
  transactions: state.transactions,
  accounts: state.accounts,
});
export default connect(MapStatetoProps, {
  getTransactions,
  setMonthTotals,
  setMonthNetPercent,
  setSixMonthNet,
  setSixMonthMax,
})(MonthlyNetGraph);
