import React, { useState, useEffect } from 'react';
import { setBudgetMonthSum } from '../../actions/BudgetActions';
import { connect } from 'react-redux';

import { getMonthTypeSum } from '../../actions/transactionActions';

function BudgetsLeftColumn({
  budgets: { budgetList, budgetIncomeSum, budgetSpendingSum },
  transactions: { spendingSum, incomeSum, nonBudgetedIncomeTransactions },
  months: { month },
  getMonthTypeSum,
  setBudgetMonthSum,
}) {
  //used to ensure spending is lined up with the spending budgets
  //in the left column
  const [incomeLength, setIncomeLength] = useState(0);

  //also need to account for other income budget items
  //however they are not as large as progress bars
  const [otherIncomeLength, setOtherIncomeLength] = useState(0);
  useEffect(() => {
    getMonthTypeSum(month, 'Deposit', budgetList);
    getMonthTypeSum(month, 'Withdrawal', budgetList);
    setBudgetMonthSum('Spending');
    setBudgetMonthSum('Income');

    //setting margin multiplier so spending lines up with spending budgets
    setIncomeLength(
      budgetList.filter((budget) => budget.category === 'Income').length
    );
    // setting margin between income and spending in left budgets column when other transaction is added
    setOtherIncomeLength(nonBudgetedIncomeTransactions.length);

    //eslint-disable-next-line
  }, [month, budgetList]);

  return (
    <div className='col-lg-4 col-md-3 d-none d-lg-block bg budget-left-background  '>
      <h2 className='text-right' style={{ marginTop: '140px' }}>
        Income
      </h2>
      <div className='text-right'>
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(incomeSum)}{' '}
        </strong>
        <span>so far</span>
      </div>
      <div className='text-right'>
        <span>of</span>
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(budgetIncomeSum)}
        </strong>
      </div>

      {/* //setting margin so spending left column lines up with spending
      //no matter the number of income budgets/ other income transactions
      //could have turned entire income section into row
     //however wanted to hide certain columns upon page size 
     10px is initial buffer if no income budgets or transactions
     each budget item is 70px, other transaciton is 16px*/}
      <h2
        className='text-right'
        style={{
          marginTop: `${
            incomeLength + otherIncomeLength === 0
              ? 10
              : 10 + 70 * incomeLength + 16 * otherIncomeLength
          }px`,
        }}
      >
        Spending
      </h2>
      <div className='text-right'>
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(spendingSum)}{' '}
        </strong>
        <span>so far</span>
      </div>
      <div className='text-right'>
        <span>of</span>
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(budgetSpendingSum)}
        </strong>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  budgets: state.budgets,
  transactions: state.transactions,
  months: state.months,
});

export default connect(mapStateToProps, {
  setBudgetMonthSum,
  getMonthTypeSum,
})(BudgetsLeftColumn);
