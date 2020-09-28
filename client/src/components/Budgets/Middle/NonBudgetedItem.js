import React from 'react';
import { Link } from 'react-router-dom';
import {
  setTransactionListByCategory,
  preventTransactionReRendering,
} from '../../../actions/transactionActions';
import { connect } from 'react-redux';

function NonBudgetedItem({
  months: { month },
  transaction,
  setTransactionListByCategory,
  preventTransactionReRendering,
}) {
  return (
    <li className='d-flex justify-content-between'>
      <Link
        to='/transactions'
        className='small-font'
        onClick={() => {
          preventTransactionReRendering();
          setTransactionListByCategory(transaction, month);
        }}
      >{`${transaction.category}: ${transaction.subCategory}`}</Link>
      <span className='small-font'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(transaction.amount)}
      </span>
    </li>
  );
}

const mapStateToProps = (state) => ({
  months: state.months,
});

export default connect(mapStateToProps, {
  setTransactionListByCategory,
  preventTransactionReRendering,
})(NonBudgetedItem);
