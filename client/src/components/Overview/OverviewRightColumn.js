import React from 'react';
import GoalsCard from '../Overview/OtherCards/GoalsCard';
import SpendingCard from '../Overview/OtherCards/SpendingCard';
import BudgetCard from '../Overview/OtherCards/BudgetCard';

function OverviewRightColumn(props) {
  return (
    <div className='col-md-7 col-lg-7 p-3'>
      <GoalsCard />
      <SpendingCard />
      <BudgetCard />
    </div>
  );
}

export default OverviewRightColumn;
