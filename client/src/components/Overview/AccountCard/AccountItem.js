import React from 'react';

function AccountItem({ account }) {
  return (
    <React.Fragment>
      <li className='list-group-item'>
        {/* this needs to be a link to account transactions */}
        <a
          className='card-text small-font text-dark'
          href='/#'
          style={{ float: 'left' }}
        >
          {account.accountName}
        </a>

        <p className='card-text small-font ' style={{ float: 'right' }}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(account.balance)}
        </p>
      </li>
      <li className='list-group-item text-muted'>
        <p className='card-text extra-small-font ' style={{ float: 'left' }}>
          {account.institution}
        </p>

        <p className='card-text extra-small-font' style={{ float: 'right' }}>
          {account.lastUpdated}
        </p>
      </li>
    </React.Fragment>
  );
}

export default AccountItem;
