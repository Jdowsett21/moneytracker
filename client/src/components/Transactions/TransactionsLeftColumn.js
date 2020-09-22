import React from 'react';
import AccountTypesFilter from './AccountTypesFilter';
import FilterByAccount from './FilterByAccount';

function TransactionsLeftColumn(props) {
  return (
    <React.Fragment>
      <div className='col-md-5 col-lg-4 p-5 '>
        <AccountTypesFilter />
        <FilterByAccount />
      </div>
    </React.Fragment>
  );
}

export default TransactionsLeftColumn;
