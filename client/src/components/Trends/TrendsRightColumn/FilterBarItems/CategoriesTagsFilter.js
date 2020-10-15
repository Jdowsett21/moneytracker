import React from 'react';

function CategoriesTagsFilter(props) {
  return (
    <div>
      <label>Show transactions that match any</label>
      <input
        type='text'
        className='form-control p-0 small-font'
        style={{
          maxHeight: '24px',
        }}
      />
    </div>
  );
}

export default CategoriesTagsFilter;
