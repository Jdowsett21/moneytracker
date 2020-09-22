import React from 'react';

function Container({ children, margin }) {
  return (
    <div className={`container ${margin}`}>
      <div className='row  justify-content-md-center'>{children}</div>
    </div>
  );
}

export default Container;
