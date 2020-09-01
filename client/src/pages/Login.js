import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import grivety from '../img/grivety.jpg';
import { connect } from 'react-redux';
import {
  isUserAuthenticated,
  isAdmin,
  setAuthInfo,
  loginValidation,
} from '../actions/authActions';
import FormInput from './../components/FormInput';

import { Redirect } from 'react-router-dom';
import GradientButton from './../components/common/GradientButton';
import FormSuccess from './../components/common/FormSuccess';
import FormError from './../components/common/FormError';
import PropTypes from 'prop-types';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({
  auth: { loginError, isAuthenticated, loginSuccess, loading, redirectOnLogin },
  setAuthInfo,
  loginValidation,
  isUserAuthenticated,
  isAdmin,
}) => {
  useEffect(() => {
    isUserAuthenticated();

    return () => {
      setAuthInfo();
      isAdmin();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {(redirectOnLogin || isAuthenticated) && <Redirect to='/overview' />}
      <div className='logo-background'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 m-auto text-center'>
              <img src={grivety} alt='' className='img-fluid grivety mb-0' />

              <div className='row'></div>
            </div>
          </div>
          <div className='col-md-6 m-auto'>
            <div
              className='card bg-dark border-primary m-auto'
              style={{ width: '300px' }}
            >
              <div className='card-body'>
                <div className='text-center mb-3 '>
                  <h5 className='card-title '>Sign In</h5>
                  <span className='medium-font'>
                    One Account For All Your Bank Accounts
                  </span>
                  <div className=''>
                    <a href='/#' className=' m-auto small-font'>
                      Learn more
                    </a>
                  </div>
                </div>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(values) => loginValidation(values)}
                  validationSchema={LoginSchema}
                >
                  {() => (
                    <Form>
                      {' '}
                      {loginSuccess && <FormSuccess text={loginSuccess} />}
                      {loginError && <FormError text={loginError} />}
                      <div className='form-group'>
                        <label>Email or user ID</label>
                        <FormInput
                          ariaLabel='Email address'
                          name='email'
                          type='email'
                          placeholder='Email address'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Password</label>
                        <FormInput
                          ariaLabel='Password'
                          name='password'
                          type='password'
                          placeholder='Password'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Remember Me</label>
                        <input type='checkbox' className='ml-2' />
                      </div>
                      <GradientButton
                        type='submit'
                        text='Login'
                        loading={loading}
                      />
                    </Form>
                  )}
                </Formik>

                <div className='text-center small-font'>
                  <cite>
                    By clicking Sign In, you agree to our <a href='/#'>Terms</a>{' '}
                    and have read and acknowledge our{' '}
                    <a href='/#'>US Privacy Statement</a>
                  </cite>
                </div>
              </div>
              <div className='card-footer text-center'>
                <div className='media  '>
                  <a href='/#' className=' m-auto small font'>
                    I forgot my user ID or password
                  </a>
                </div>
                <p className='small-font text-center'>
                  New to Intuit?{' '}
                  <a href='/#' className=''>
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className='text-center extra-small-font mt-2'>
          <div className='row'>
            <div className='col-md-5 m-auto px-3'>
              <div className='mb-2'>
                <a href='/#' className=' mr-2 '>
                  Legal
                </a>
                <a href='/#' className=' mr-2'>
                  Privacy
                </a>
                <a href='/#'>Security</a>
              </div>
              <p>
                © 2020 Grevity, Inc. All rights reserved. Grevity is a
                registered trademarks of Grevity Inc. Terms and conditions,
                features, support, pricing, and service options subject to
                change without notice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginValidation: PropTypes.func.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  loginValidation,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
})(Login);
