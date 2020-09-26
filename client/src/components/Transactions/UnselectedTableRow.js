import React from 'react';
import { connect } from 'react-redux';
import { setSelectedTransaction } from '../../actions/transactionActions';

function UnselectedTableRow({ transaction, setSelectedTransaction }) {
  return (
    <tr
      className='text-align-center'
      key={transaction._id}
      onClick={() => setSelectedTransaction(transaction)}
    >
      <td className='selected-transaction-row'>
        <input type='checkbox' />
      </td>
      <td className='unselected-transaction-row' style={{ maxWidth: '80px' }}>
        {transaction.shortDate}
      </td>
      <td className='unselected-transaction-row' style={{ maxWidth: '130px' }}>
        {transaction.description}
      </td>
      <td className='unselected-transaction-row' style={{ maxWidth: '95px' }}>
        {transaction.category}
      </td>
      <td
        className='unselected-transaction-row'
        style={{ maxWidth: '80px' }}
      ></td>
      <td className='unselected-transaction-row' style={{ maxWidth: '90px' }}>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(transaction.amount)}
      </td>
    </tr>
  );
}

export default connect(null, { setSelectedTransaction })(UnselectedTableRow);
