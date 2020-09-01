import React from 'react';

function Container({ children }) {
  return (
    <div className='container '>
      <div className='row  justify-content-md-center'>{children}</div>
    </div>
  );
}

export default Container;
