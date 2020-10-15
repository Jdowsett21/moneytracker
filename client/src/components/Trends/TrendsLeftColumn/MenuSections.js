import React, { useState } from 'react';
import MenuSubItems from './MenuSubItems';

function MenuSections({ item, index }) {
  const [open, setOpen] = useState(true);

  return (
    <div className='container'>
      <div data-toggle='collapse' data-target={`#${item.listHeader}`}>
        <li>
          <a className='small-medium-font' onClick={() => setOpen(!open)}>
            {item.listHeader}{' '}
            <i
              className={`fas fa-chevron-${open ? 'down' : 'right'} small-font`}
            ></i>
          </a>
        </li>
      </div>
      <ul id={item.listHeader} className='collapse show list-group'>
        {item.subList.map((subItem, index) => (
          <MenuSubItems key={index} item={item} subItem={subItem} />
        ))}
      </ul>
    </div>
  );
}

export default MenuSections;
