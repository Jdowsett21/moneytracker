import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getNonBudgetedTransactions,
  getNonBudgetedTransactionsSum,
} from '../../../actions/transactionActions';
import NonBudgetedItem from './NonBudgetedItem';
function NonBudgetedTransactions({
  type,
  message,
  transactions: {
    nonBudgetedTransferTransactions,
    nonBudgetedIncomeTransactions,
    nonBudgetedSpendingTransactions,
    nonBudgetedSpendingSum,
    nonBudgetedIncomeSum,
  },
  getNonBudgetedTransactions,
  getNonBudgetedTransactionsSum,
  months: { month },
  budgets: { budgetList },
}) {
  useEffect(() => {
    //gets the transactions and the sum
    getNonBudgetedTransactions(month, type, budgetList);
    getNonBudgetedTransactionsSum(month, type, budgetList);
  }, [month, budgetList]);
  return (
    <ul className='mb-5'>
      {
        <div className='d-flex justify-content-between small-font-dark'>
          <a
            onClick={() => getNonBudgetedTransactions(month, type, budgetList)}
          >
            {message}
          </a>
          <span>
            {type === 'Withdrawal'
              ? nonBudgetedSpendingSum
              : nonBudgetedIncomeSum}
          </span>
        </div>
      }
      {type === 'Withdrawal'
        ? nonBudgetedSpendingTransactions.map(
            (transaction) =>
              transaction.paymentType === type && (
                <NonBudgetedItem
                  key={transaction._id}
                  transaction={transaction}
                />
              )
          )
        : nonBudgetedIncomeTransactions.map(
            (transaction) =>
              transaction.paymentType === type && (
                <NonBudgetedItem
                  key={transaction._id}
                  transaction={transaction}
                />
              )
          )}
    </ul>
  );
}
const mapStateToProps = (state) => ({
  transactions: state.transactions,
  months: state.months,
  budgets: state.budgets,
});
export default connect(mapStateToProps, {
  getNonBudgetedTransactions,
  getNonBudgetedTransactionsSum,
})(NonBudgetedTransactions);
