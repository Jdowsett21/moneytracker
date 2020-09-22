import React from 'react';
import { Link } from 'react-router-dom';
function NavBarSecondary(props) {
  return (
    <nav className='navbar navbar-expand-sm bg-light navbar-light small-font'>
      <div className='container'>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarCollapse2'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse small-medium-font navbar-collapse justify-content-between mx-5'
          id='navbarCollapse2'
        >
          <ul className='navbar-nav '>
            <li className='nav-item'>
              <Link to='/overview' className='nav-link'>
                OVERVIEW
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav '>
            <li className='nav-item '>
              <Link to='/transactions' className='nav-link'>
                TRANSACTIONS
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav '>
            <li className='nav-item '>
              <Link to='/goals' className='nav-link'>
                GOALS
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav '>
            <li className='nav-item '>
              <Link to='/budgets' className='nav-link'>
                BUDGETS{' '}
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav '>
            <li className='nav-item px-2 '>
              <Link to='/trends' className='nav-link'>
                TRENDS{' '}
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav '>
            <li className='nav-item active item-hl'>
              <Link to='/waystosave' className='nav-link'>
                WAYS TO SAVE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarSecondary;
