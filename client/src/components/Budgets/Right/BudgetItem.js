import React, { useEffect, useState } from 'react';

function BudgetItem({ item, categoryTotal }) {
  const [ratio, setRatio] = useState('');
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    setRatio(
      categoryTotal > item.budgetLimit
        ? 100
        : (categoryTotal / item.budgetLimit) * 100
    );
    setBarColor(
      categoryTotal > item.budgetLimit
        ? 'danger'
        : categoryTotal / item.budgetLimit < 0.8
        ? 'success'
        : 'warning'
    );
  }, []);

  return (
    <div key={item.category}>
      <div className='d-flex justify-content-between px-3'>
        <h2 className='small-font-dark'>{item.category}</h2>
        <span className='small-font-dark'>{`$${categoryTotal} of $${item.budgetLimit}`}</span>
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

export default BudgetItem;
