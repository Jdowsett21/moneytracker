import React from 'react';
import grivety from '../../img/grivety.jpg';

import { Link } from 'react-router-dom';

import ScrollSpyItem from './../common/ScrollSpyItem';
function HomeNavBar(props) {
  return (
    <nav className='fixed-top navbar-primary navbar navbar-dark navbar-expand-sm logo-background p-0'>
      {' '}
      <a href='/#'>
        <img src={grivety} alt='' className='img-fluid grivety-small mb-0' />
      </a>
      <button
        className='navbar-toggler'
        data-toggle='collapse'
        data-target='#collapseNavBarHome'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='collapseNavbar'>
        {/* hoping to set up scroll spy in future */}
        {/* <ScrollSpy
          items={[
            'home-section',
            'track-section',
            'budget-section',
            'summary-section',
            'signup-section',
          ]}
        > */}
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <ScrollSpyItem
              href='#home-section'
              id='goto-home-section'
              name='Home'
            />
          </li>
          <li className='nav-item'>
            <ScrollSpyItem
              href='#track-section'
              id='goto-track-section'
              name='Track'
            />
          </li>
          <li className='nav-item'>
            <ScrollSpyItem
              href='#budget-section'
              id='goto-budget-section'
              name='Budget'
            />
          </li>
          <li className='nav-item'>
            <ScrollSpyItem
              href='#summary-section'
              id='goto-summary-section'
              name='Summary'
            />
          </li>
          <li className='nav-item'>
            <ScrollSpyItem
              href='#signup-section'
              id='goto-signup-section'
              name='Signup'
            />
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item px-2'>
            <Link className='nav-link ' to='/login'>
              Login
            </Link>
          </li>
          <Link className='nav-link' to='/signup'>
            Signup
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default HomeNavBar;
