import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  preventTransactionReRendering,
  setTransactionListByCategory,
} from './../../../actions/transactionActions';

function BudgetCardItem({
  budget,
  categoryTotal,
  preventTransactionReRendering,
  setTransactionListByCategory,
  months: { month },
}) {
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
          <Link
            to='/transactions'
            className='mr-auto text-dark'
            onClick={() => {
              preventTransactionReRendering();
              setTransactionListByCategory(budget, month);
            }}
          >
            {budget.subCategory === '' ? (
              <strong className='small-medium-font '>{`${budget.category}`}</strong>
            ) : (
              <span className='small-medium-font '>{`${budget.category}`}</span>
            )}
            <strong className='small-medium-font'>
              {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
            </strong>
          </Link>
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

const mapStateToProps = (state) => ({
  months: state.months,
});

export default connect(mapStateToProps, {
  preventTransactionReRendering,
  setTransactionListByCategory,
})(BudgetCardItem);
