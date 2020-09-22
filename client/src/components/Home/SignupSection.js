import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../../img/Saving-Budget-Piggy.gif';
function SignupSection(props) {
  const [isHoveredSignup, setIsHoveredSignup] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  return (
    <section id='signup-section' style={{ backgroundColor: '#00a6a4' }}>
      <div className='container'>
        <div className='row '>
          <div className='col-md-6 py-5  d-flex align-self-center '>
            <div className='card bg-white  shadow-lg rounded-top text-center'>
              <div className='card-header'>
                <h3>Get Started Today!</h3>
              </div>
              <div className='card-body '>
                <p>
                  Take the leap and get started on mastering your finances
                  today!
                </p>
                <div className='d-flex justify-content-center'>
                  <Link to='/signup'>
                    <button
                      onMouseEnter={() => setIsHoveredSignup(true)}
                      onMouseLeave={() => setIsHoveredSignup(false)}
                      className='btn m-3 p-2 '
                      style={{
                        backgroundColor: isHoveredSignup ? 'white' : '#ff9331',
                        borderColor: isHoveredSignup ? '#ff9331' : 'white',
                      }}
                    >
                      <i className='fas fa-lock pr-2'></i>
                      Signup
                    </button>
                  </Link>
                  <Link to='/login'>
                    <button
                      onMouseEnter={() => setIsHoveredLogin(true)}
                      onMouseLeave={() => setIsHoveredLogin(false)}
                      className='btn m-3 p-2'
                      style={{
                        backgroundColor: isHoveredLogin ? '#00a6a4' : 'white',
                        borderColor: isHoveredLogin ? 'white' : '#00a6a4',
                      }}
                    >
                      <i className='fas fa-lock pr-2'></i>
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 ml-auto py-5 d-flex justify-content-center'>
            <img
              src={Signup}
              alt=''
              style={{ width: '75%' }}
              className='img-fluid rounded-circle shadow-lg  '
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupSection;
