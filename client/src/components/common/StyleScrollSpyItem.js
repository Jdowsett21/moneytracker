import React from 'react';

function StyleScrollSpyItem({ id, href, className, name }) {
  return (
    <a className={`nav-link ${className}`} id={id} href={href}>
      {name}
    </a>
  );
}

export default StyleScrollSpyItem;
