import React, { useEffect, useState } from 'react';

function BudgetCardItem({ budget, categoryTotal }) {
  const [ratio, setRatio] = useState('');
  const [barColor, setBarColor] = useState('');

  useEffect(() => {
    setRatio(
      categoryTotal >= budget.budgetLimit
        ? 100
        : (categoryTotal / budget.budgetLimit) * 100
    );
    setBarColor(
      categoryTotal >= budget.budgetLimit
        ? 'danger'
        : categoryTotal / budget.budgetLimit < 0.8
        ? 'success'
        : 'warning'
    );
  }, [budget, categoryTotal]);

  return (
    <div key={budget.category}>
      <div className='d-flex justify-content-between px-3'>
        <div className='mr-auto'>
          <strong className='small-font-dark '>{`${budget.category}`}</strong>
          <span className='small-font-dark'>
            {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
          </span>
        </div>
      </div>

      <div className='progress m-2'>
        <div
          className={`progress-bar bg-${barColor}`}
          style={{ width: `${ratio}%` }}
        ></div>
      </div>
    </div>
  );
}

export default BudgetCardItem;
