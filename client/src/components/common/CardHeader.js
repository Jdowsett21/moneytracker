import React from 'react';

function CardHeader({ children, classSpecifics }) {
  return <div className={`card-header pb-4 ${classSpecifics}`}>{children}</div>;
}

export default CardHeader;
