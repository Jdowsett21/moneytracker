import React from 'react';
import MonthSelector from './Middle/MonthSelector';
import moment from 'moment';
import AddBudgetModal from './AddBudgetModal';
import BudgetList from './Middle/BudgetList';
import NonBudgetedTransactions from './Middle/NonBudgetedTransactions';
import ManageBudgetCategoryModal from '../Transactions/ManageBudgetCategoryModal';
import { getBudgetCategories } from '../../actions/BudgetCategoriesActions';

import AddBudgetCategoryModal from './AddBudgetCategoryModal';
function BudgetsMiddleColumn() {
  const lastTwelveMonths = [
    // static solution
    {
      label: moment('2020-10-31').subtract(11, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(11, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(10, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(10, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(10, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(9, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(9, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(9, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(8, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(8, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(7, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(6, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(7, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(7, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(5, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(6, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(6, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(5, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(5, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(5, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(4, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(4, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(4, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(3, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(3, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(3, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(2, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(2, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(2, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .subtract(1, 'months')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(1, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(1, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .subtract(1, 'days')
        .toISOString(),
    },
    {
      label: moment('2020-10-31').subtract(0, 'months').format('MMM'),
      dataFilter1: moment('2020-10-31')
        .date(1)
        .subtract(0, 'months')
        .toISOString(),
      dataFilter2: moment('2020-10-31')
        .date(1)
        .add(1, 'months')
        .subtract(1, 'days')
        .toISOString(),
    },
    // dynamic solution
    // {
    //   label: moment().subtract(11, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(11, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(10, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(10, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(10, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(9, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(9, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(9, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(8, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(8, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(7, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(6, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(7, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(7, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(5, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(6, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(6, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(5, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(5, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(5, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(4, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(4, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(4, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(3, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(3, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(3, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(2, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(2, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(2, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .subtract(1, 'days')
    //     .subtract(1, 'months')
    //     .toISOString(),
    // },
    // {
    //   label: moment().subtract(1, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(1, 'months').toISOString(),
    //   dataFilter2: moment().date(1).subtract(1, 'days').toISOString(),
    // },
    // {
    //   label: moment().subtract(0, 'months').format('MMM'),
    //   dataFilter1: moment().date(1).subtract(0, 'months').toISOString(),
    //   dataFilter2: moment()
    //     .date(1)
    //     .add(1, 'months')
    //     .subtract(1, 'days')
    //     .toISOString(),
    // },
  ];

  return (
    <div className=' col-lg-5 pr-5 shadow-lg'>
      {/* <h2>{selectedMonth}</h2> */}
      <ul className='list-group list-group-horizontal d-flex justify-content-center'>
        {lastTwelveMonths.map((dateInfo, index) => (
          <MonthSelector
            key={dateInfo.label}
            index={index}
            dateInfo={dateInfo}
          />
        ))}
      </ul>
      <div className=' d-flex justify-content-end'>
        <button
          className='btn btn-outline-dark my-3'
          data-toggle='modal'
          data-target='#addBudget'
          type='button'
        >
          + Add Budget
        </button>
      </div>

      <AddBudgetModal />
      <AddBudgetCategoryModal />
      <ManageBudgetCategoryModal />
      <BudgetList type='Income' />
      <NonBudgetedTransactions type='Deposit' message='Other Income' />
      <BudgetList type='Spending' />
      <NonBudgetedTransactions type='Withdrawal' message='Everything Else' />
    </div>
  );
}

export default BudgetsMiddleColumn;
