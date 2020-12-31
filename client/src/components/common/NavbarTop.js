import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/grivety.jpg';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
function NavbarTop({ logout }) {
  return (
    <nav className='navbar navbar-primary navbar-dark navbar-expand-sm logo-background p-0 px-5 mb-5'>
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
      <div
        className='collapse navbar-collapse small-medium-font mx-5  d-flex justify-content-between'
        id='navbarCollapse'
      >
        <Link to='/overview' className='nav-link'>
          OVERVIEW
        </Link>
        <ul className='navbar-nav'>
          <li className='nav-item'></li>

          <li className='nav-item '>
            <Link to='/transactions' className='nav-link'>
              TRANSACTIONS
            </Link>
          </li>

          <li className='nav-item '>
            <Link to='/budgets' className='nav-link'>
              BUDGETS{' '}
            </Link>
          </li>
          <li className='nav-item '>
            <Link to='/trends' className='nav-link'>
              TRENDS{' '}
            </Link>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/#' onClick={logout}>
              LOGOUT
            </a>
          </li>
        </ul>
        {/* <ul className='navbar-nav '>
          <li className='nav-item ringing-bell'>
            <a href='contact.html' className='nav-link'>
              <i className='far fa-bell fa-2x faa-ring animated-hover'></i>
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default connect(null, { logout })(NavbarTop);
