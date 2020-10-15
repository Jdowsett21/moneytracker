import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getNonBudgetedTransactions,
  getNonBudgetedTransactionsSum,
  setTransactionList,
  preventTransactionReRendering,
} from '../../../actions/transactionActions';
import NonBudgetedItem from './NonBudgetedItem';
import { Link } from 'react-router-dom';
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
  preventTransactionReRendering,
  getNonBudgetedTransactions,
  setTransactionList,
  getNonBudgetedTransactionsSum,
  time: { month },
  budgets: { budgetList },
}) {
  const [transactions, setTransactions] = useState('');
  useEffect(() => {
    //gets the transactions and the sum
    getNonBudgetedTransactions(month, type, budgetList);
    getNonBudgetedTransactionsSum(month, type, budgetList);
    setTransactions(
      type === 'Deposit'
        ? nonBudgetedIncomeTransactions
        : nonBudgetedSpendingTransactions
    ); //eslint-disable-next-line
  }, [month, budgetList]);
  return (
    <ul className='mb-5 px-2'>
      <div className='d-flex justify-content-between '>
        <Link
          to='/transactions'
          className='small-medium-font  text-dark'
          href='#'
          onClick={() => {
            preventTransactionReRendering();
            setTransactionList(transactions, month);
          }}
        >
          {message}
        </Link>
        <span className='small-medium-font'>
          {type === 'Withdrawal'
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(nonBudgetedSpendingSum)
            : new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(nonBudgetedIncomeSum)}
        </span>
      </div>

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
  time: state.time,
  budgets: state.budgets,
});
export default connect(mapStateToProps, {
  getNonBudgetedTransactions,
  setTransactionList,
  getNonBudgetedTransactionsSum,
  preventTransactionReRendering,
})(NonBudgetedTransactions);
