import React from 'react';

function Card({ children, classSpecifics }) {
  return <div className={`card ${classSpecifics}`}>{children}</div>;
}

export default Card;
