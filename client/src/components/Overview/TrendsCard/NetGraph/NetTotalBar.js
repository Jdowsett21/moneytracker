import React from 'react';

function NetTotalBar({ text, type, style, value }) {
  return (
    <li className={type} style={{ width: style }}>
      <label className='text-extra-small text-muted'>{text}</label>
      <var>{value}</var>
    </li>
  );
}

export default NetTotalBar;
