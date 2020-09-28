import React from 'react';
import { connect } from 'react-redux';

function BudgetsRightColumn({
  budgets: { budgetSpendingSum, budgetIncomeSum },
}) {
  return (
    <div
      className='col-md-3 d-none d-lg-block col-lg-3'
      style={{ height: '100%' }}
    >
      <div
        className='card rounded shadow border'
        style={{
          maxWidth: '60%',
          marginTop: '140px',
          borderColor: '#5b5b5b',
        }}
      >
        <div className='card-header p-1'>
          <h2 className='large-font pb-4'>You've budgeted...</h2>
          <div className='d-flex justify-content-between'>
            <h3 className='small-medium-font'>Income:</h3>

            <h3 className='medium-font'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(budgetIncomeSum)}
            </h3>
          </div>
          <div className='d-flex justify-content-between'>
            <h3 className='small-medium-font'>Spending:</h3>

            <h3 className='small-medium-font text-danger'>
              {budgetSpendingSum > 0
                ? `-${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(budgetSpendingSum)}`
                : '$0.00'}
            </h3>
          </div>
        </div>
        <div className='card-body p-1'>
          {' '}
          <div className='d-flex justify-content-between'>
            <h3 className='medium-font'>Left Over:</h3>

            <h3
              className={`medium-font text-${
                budgetIncomeSum > budgetSpendingSum ? 'success' : 'danger'
              }`}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(budgetIncomeSum - budgetSpendingSum)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  budgets: state.budgets,
});

export default connect(mapStateToProps)(BudgetsRightColumn);
