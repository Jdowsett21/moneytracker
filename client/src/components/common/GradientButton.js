import React from 'react';

const GradientButton = ({ type, text, size, loading, onClick }) => {
  return (
    <button type={type} className='btn btn-primary my-2 py-1' onClick={onClick}>
      {loading ? (
        <span className=''>
          Loading icon
          <span className=''>Loading...</span>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default GradientButton;
