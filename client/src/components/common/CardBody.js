import React from 'react';

function CardBody({ children, classSpecifics }) {
  return <div className={`card-body ${classSpecifics}`}>{children}</div>;
}

export default CardBody;
