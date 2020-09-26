import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from './../../actions/transactionActions';
import { getAccounts } from './../../actions/AccountActions';
import UnselectedTableRow from './UnselectedTableRow';
import SelectedTableRow from './SelectedTableRow';

function TransactionTable({
  transactions: { transactionList, selectedTransaction },
  getTransactions,

  getAccounts,
}) {
  useEffect(() => {
    getTransactions();
    getAccounts();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <table
        className='table table-striped table-hover table-bordered'
        style={{ fontSize: '0.8rem', borderColor: '#999' }}
      >
        <thead className='text-small'>
          <tr className='table-header'>
            <th></th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Split</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionList &&
            transactionList.map((transaction) =>
              transaction === selectedTransaction ? (
                <SelectedTableRow key={transaction._id} />
              ) : (
                <UnselectedTableRow
                  transaction={transaction}
                  key={transaction._id}
                />
              )
            )}
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
