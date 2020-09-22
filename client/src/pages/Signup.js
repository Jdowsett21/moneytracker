import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import grivety from '../img/grivety.jpg';

import {
  signupValidation,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
} from '../actions/authActions';

import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Hyperlink from './../components/common/Hyperlink';
import FormSuccess from './../components/common/FormSuccess';
import FormError from './../components/common/FormError';
import Label from './../components/common/Label';
import GradientButton from './../components/common/GradientButton';
import FormInput from './../components/common/FormInput';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Signup({
  auth: {
    signupSuccess,
    signupError,
    isAuthenticated,
    redirectOnLogin,
    loading,
  },
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
  signupValidation,
}) {
  useEffect(() => {
    isUserAuthenticated();
    return () => {
      setAuthInfo();
      isAdmin();
    };
  }, [isUserAuthenticated, setAuthInfo, isAdmin]);
  return (
    <React.Fragment>
      {(redirectOnLogin || isAuthenticated) && <Redirect to='/overview' />}
      <section className='logo-background fill-window'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 m-auto text-center'>
              <img src={grivety} alt='' className='img-fluid grivety mb-0' />
            </div>
          </div>
          <div className='col-md-6 m-auto'>
            <div
              className='card bg-dark border-primary m-auto'
              style={{ width: '300px' }}
            >
              <div className='card-body'>
                <div className='text-center mb-3 '>
                  <h5 className='card-title '>Signup</h5>
                  <span className='medium-font'>
                    One Account For All Your Bank Accounts
                  </span>
                  <div className=''>
                    <a href='/#' className=' m-auto small-font'>
                      Learn more
                    </a>
                  </div>
                </div>

                <p>
                  Already have an account?{' '}
                  <Hyperlink to='login' text='Login Now' />
                </p>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                  }}
                  onSubmit={(values) => signupValidation(values)}
                  validationSchema={SignupSchema}
                >
                  {() => (
                    <Form>
                      {' '}
                      {signupSuccess && (
                        <FormSuccess text={signupSuccess} />
                      )}{' '}
                      {signupError && <FormError text={signupError} />}
                      <Label text='First Name' />
                      <FormInput
                        ariaLabel='First Name'
                        name='firstName'
                        type='text'
                        placeholder='First Name'
                      />
                      <Label text='Last Name' />
                      <FormInput
                        ariaLabel='Last Name'
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                      />
                      <Label text='Email address' />
                      <FormInput
                        ariaLabel='Email address'
                        name='email'
                        type='email'
                        placeholder='Email address'
                      />
                      <Label text='Password' />
                      <FormInput
                        ariaLabel='Password'
                        name='password'
                        type='password'
                        placeholder='Password'
                      />
                      <GradientButton
                        type='submit'
                        text='Sign Up'
                        loading={loading}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
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
      </section>
    </React.Fragment>
  );
}
Signup.propTypes = {
  auth: PropTypes.object.isRequired,
  signupValidation: PropTypes.func.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  signupValidation,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
})(Signup);
