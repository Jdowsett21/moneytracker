import React from 'react';

function NonBudgetedItem({ transaction }) {
  return (
    <li className='d-flex justify-content-between'>
      <a
        href='#'
        className='extra-small-font-grey'
      >{`${transaction.category}: ${transaction.subCategory}`}</a>
      <span className='extra-small-font'>{transaction.amount}</span>
    </li>
  );
}

export default NonBudgetedItem;
