import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  preventTransactionReRendering,
  setTransactionListByAccount,
} from './../../../actions/transactionActions';
function AccountItem({
  account,
  preventTransactionReRendering,
  setTransactionListByAccount,
}) {
  return (
    <React.Fragment>
      <li className='list-group-item'>
        {/* this needs to be a link to account transactions */}
        <Link
          to='/transactions'
          onClick={() => {
            preventTransactionReRendering();
            setTransactionListByAccount(account);
          }}
          className='card-text small-medium-font text-dark'
          href='/#'
          style={{ float: 'left' }}
        >
          {account.accountName}
        </Link>

        <p className='card-text small-medium-font ' style={{ float: 'right' }}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(account.balance)}
        </p>
      </li>
      <li className='list-group-item text-muted'>
        <p className='card-text small-font ' style={{ float: 'left' }}>
          {account.institution}
        </p>

        <p className='card-text small-font' style={{ float: 'right' }}>
          {account.lastUpdated}
        </p>
      </li>
    </React.Fragment>
  );
}

export default connect(null, {
  preventTransactionReRendering,
  setTransactionListByAccount,
})(AccountItem);
