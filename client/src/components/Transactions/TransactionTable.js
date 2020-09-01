import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from './../../actions/transactionActions';
import { getAccounts } from './../../actions/AccountActions';

function TransactionTable({
  transactions: { transactionList },
  getTransactions,
  getAccounts,
}) {
  useEffect(() => {
    getTransactions();
    getAccounts();
    //eslint-disable-next-line
  }, []);
  return (
    <div className=''>
      <table className='table table-dark'>
        <thead className='text-small'>
          <tr>
            <th>CheckBox</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Split</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionList &&
            transactionList.map((transaction) => (
              <tr key={transaction._id}>
                <td>Checkbox</td>
                <td>{transaction.shortDate}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td></td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(transaction.amount)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  transactions: state.transactions,
});

export default connect(mapStatetoProps, {
  getTransactions,
  getAccounts,
})(TransactionTable);
