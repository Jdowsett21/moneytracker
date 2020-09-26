import React from 'react';
import MonthSelector from './Middle/MonthSelector';
import moment from 'moment';
import AddBudgetModal from './AddBudgetModal';
import BudgetList from './Middle/BudgetList';
import NonBudgetedTransactions from './Middle/NonBudgetedTransactions';
import ManageBudgetCategoryModal from '../Transactions/ManageBudgetCategoryModal';
import { getBudgetCategories } from '../../actions/BudgetCategoriesActions';
import { connect } from 'react-redux';

import AddBudgetCategoryModal from './AddBudgetCategoryModal';
function BudgetsMiddleColumn({ getBudgetCategories }) {
  const lastTwelveMonths = [
    moment().subtract(11, 'months').format('MMM'),
    moment().subtract(10, 'months').format('MMM'),
    moment().subtract(9, 'months').format('MMM'),
    moment().subtract(8, 'months').format('MMM'),
    moment().subtract(7, 'months').format('MMM'),
    moment().subtract(6, 'months').format('MMM'),
    moment().subtract(5, 'months').format('MMM'),
    moment().subtract(4, 'months').format('MMM'),
    moment().subtract(3, 'months').format('MMM'),
    moment().subtract(2, 'months').format('MMM'),
    moment().subtract(1, 'months').format('MMM'),
    moment().subtract(0, 'months').format('MMM'),
  ];

  return (
    <div className='col-md-6 col-lg-6'>
      {/* <h2>{selectedMonth}</h2> */}
      <ul className='list-group list-group-horizontal d-flex justify-content-center'>
        {lastTwelveMonths.map((month, index) => (
          <MonthSelector key={month} index={index} listMonth={month} />
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

export default connect(null, { getBudgetCategories })(BudgetsMiddleColumn);
