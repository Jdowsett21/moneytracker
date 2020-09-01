import React, { useState } from 'react';
import MonthSelector from '../Budgets/Right/MonthSelector';
import moment from 'moment';
import AddBudgetModal from './AddBudgetModal';
import BudgetList from './Right/BudgetList';
import Container from './../common/Container';
function BudgetsRightColumn(props) {
  const [month, setMonth] = useState(moment().format('MMM'));

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
    <div>
      {/* <h2>{selectedMonth}</h2> */}
      <ul className='list-group list-group-horizontal'>
        {lastTwelveMonths.map((month) => (
          <MonthSelector key={month} month={month} />
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
      <BudgetList />
    </div>
  );
}

export default BudgetsRightColumn;
