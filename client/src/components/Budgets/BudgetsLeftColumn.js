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
    //other factor setting margin between income and spending in left budgets column
    setOtherIncomeLength(nonBudgetedIncomeTransactions.length * 0.5);

    //eslint-disable-next-line
  }, [month, budgetList]);

  return (
    <div className='col-lg-4 col-md-3 d-none d-md-block bg bg-light '>
      <h2 className='text-right' style={{ marginTop: '150px' }}>
        Income
      </h2>
      <div className='text-right'>
        <strong>{`$${incomeSum} `}</strong>
        <span>so far</span>
      </div>
      <div className='text-right'>
        <span>of</span>
        <strong>{` $${budgetIncomeSum}`}</strong>
      </div>

      {/* //setting margin so spending left column lines up with spending
      //no matter the number of income NavBarSecondary
      //could have turned entire income section into row
    520ad  //however wanted to hide certain columns upon page size */}
      <h2
        className='text-right'
        style={{
          marginTop: `${
            incomeLength + otherIncomeLength === 0
              ? 80
              : 90 * incomeLength + otherIncomeLength * 65
          }px`,
        }}
      >
        Spending
      </h2>
      <div className='text-right'>
        <strong>{`$${spendingSum} `}</strong>
        <span>so far</span>
      </div>
      <div className='text-right'>
        <span>of</span>
        <strong>{` $${budgetSpendingSum}`}</strong>
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
