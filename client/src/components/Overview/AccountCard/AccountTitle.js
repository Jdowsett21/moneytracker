import React, { useState } from 'react';

function AccountCardHeader({ accountCategory }) {
  const [open, setOpen] = useState(false);

  const iconSelector = () => {
    if (accountCategory === 'Cash') {
      return 'money-bill-alt';
    }
    if (accountCategory === 'Investment') {
      return 'signal';
    }
    if (accountCategory === 'Credit') {
      return 'credit-card';
    }
    if (accountCategory === 'Loan') {
      return 'graduation-cap';
    }
    return 'home';
  };

  return (
    <React.Fragment>
      <p
        onClick={() => setOpen(!open)}
        className='card-heading-background mb-4 medium-font py-2'
        style={{ cursor: 'pointer' }}
      >
        <i className={`fas fa-chevron-${open ? 'right' : 'down'} px-2`}></i>
        <i className={`fas fa-${iconSelector()} pr-2`}></i>
        {`${accountCategory.charAt(0).toUpperCase()}${accountCategory.slice(
          1
        )}`}
      </p>
    </React.Fragment>
  );
}

export default AccountCardHeader;
