import React from 'react';
import AccountsFilter from './FilterBarItems/AccountsFilter';
import CategoriesTagsFilter from './FilterBarItems/CategoriesTagsFilter';
import TimeFilter from './FilterBarItems/TimeFilter';

function FilterBar(props) {
  return (
    <div
      className='card small-font p-2 border-none'
      style={{ backgroundColor: '#f7f7f7' }}
    >
      <div className='d-flex justify-content-between'>
        <CategoriesTagsFilter />
        <AccountsFilter />
        <TimeFilter />
      </div>
    </div>
  );
}

export default FilterBar;
