import React from 'react';
import StyledScrollSpyItem from './../common/StyleScrollSpyItem';
function ScrollSpyItem({ id, href, children, className, name }) {
  return (
    <StyledScrollSpyItem id={id} href={href} className={className} name={name}>
      {children}
    </StyledScrollSpyItem>
  );
}

export default ScrollSpyItem;
