import React, { useEffect, useState } from 'react';
import {
  updateTransaction,
  setSelectedTransaction,
} from '../../actions/transactionActions';
import { connect } from 'react-redux';

function SelectedTableRow({
  updateTransaction,
  transactions: { selectedTransaction, transactionList },
  setSelectedTransaction,
}) {
  const [shortDate, setShortDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState('');

  const updatedTransaction = {
    _id: selectedTransaction._id,
    shortDate,
    description,
    accountName: 'value',
    category,
    subCategory,
    amount,
  };

  useEffect(() => {
    setShortDate(selectedTransaction.shortDate);
    setDescription(selectedTransaction.description);
    setCategory(selectedTransaction.category);
    setSubCategory(selectedTransaction.subCategory);
    setAmount(selectedTransaction.amount);
    //eslint-disable-next-line
  }, []);

  return (
    <tr
      key={selectedTransaction._id}
      className='no-hover '
      onMouseLeave={() => updateTransaction(updatedTransaction)}
    >
      <td className='selected-transaction-row'>
        <div className=''>
          <input type='checkbox' />
        </div>
      </td>
      <td className='selected-transaction-row' style={{ maxWidth: '70px' }}>
        <input
          className=''
          type='text'
          style={{ width: '95%', height: '1.23rem' }}
          name='short-date'
          defaultValue={shortDate}
          onChange={(e) => setShortDate(e.target.value)}
        />
      </td>
      <td className='selected-transaction-row' style={{ maxWidth: '90px' }}>
        <input
          style={{ width: '95%', height: '1.23rem' }}
          type='text'
          name='description'
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </td>

      <td className='selected-transaction-row' style={{ maxWidth: '85px' }}>
        <input
          style={{ width: '95%', height: '1.23rem' }}
          type='text'
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </td>

      <td style={{ maxWidth: '80px' }}></td>
      <td className='selected-transaction-row' style={{ maxWidth: '85px' }}>
        <input
          className=''
          style={{ width: '95%', height: '1.23rem' }}
          type='text'
          defaultValue={
            //   new Intl.NumberFormat('en-US', {
            //   style: 'currency',
            amount
          }
          //   currency: 'USD',
          // }).format

          onChange={(e) => setAmount(e.target.value)}
        />
      </td>
    </tr>
  );
}
const mapStatetoProps = (state) => ({
  transactions: state.transactions,
});

export default connect(mapStatetoProps, {
  updateTransaction,
  setSelectedTransaction,
})(SelectedTableRow);
