import React from 'react';

function NetTotalBar({ text, type, style, value }) {
  return (
    <li className={type} style={{ width: style }}>
      <label className='small-font-grey text-muted pr-2'>{text}</label>
      <var className='small-font text-dark'>{value}</var>
    </li>
  );
}

export default NetTotalBar;
