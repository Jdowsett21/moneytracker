import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/grivety.jpg';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
function NavbarTop({ logout }) {
  return (
    <nav className='navbar navbar-primary navbar-dark navbar-expand-sm logo-background p-0 px-5'>
      <a href='/#' className='navbar-brand'>
        <img
          src={logo}
          style={{ width: '70px' }}
          alt=''
          className='img-fluid'
        />
      </a>
      <button
        className='navbar-toggler'
        data-toggle='collapse'
        data-target='#navbarCollapse'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarCollapse'>
        <ul className='navbar-nav ml-auto ' style={{ fontSize: '0.8rem' }}>
          <li className='nav-item active'>
            <Link to='/accounts' className='nav-link'>
              +ADD ACCOUNTS
            </Link>
          </li>

          <li className='nav-item active'>
            <Link to='/addTransactions' className='nav-link'>
              +ADD TRANSACTIONS
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/settings' className='nav-link'>
              SETTINGS
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/profile' className='nav-link'>
              PROFILE
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/tour' className='nav-link'>
              TOUR
            </Link>
          </li>

          <li className='nav-item'>
            <a className='nav-link' href='/#' onClick={logout}>
              LOGOUT
            </a>
          </li>
          <li className='nav-item ringing-bell'>
            <a href='contact.html' className='nav-link'>
              <i className='far fa-bell fa-2x faa-ring animated-hover'></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default connect(null, { logout })(NavbarTop);
