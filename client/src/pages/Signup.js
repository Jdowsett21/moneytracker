import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
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
import FormInput from './../components/FormInput';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  streetNumber: Yup.string().required('Street Number is required'),
  streetName: Yup.string().required('Street Name is required'),
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
      {redirectOnLogin && isAuthenticated && <Redirect to='/overview' />}
      <h2>Sign up for an Account</h2>
      <p>
        Already have an account? <Hyperlink to='login' text='Login Now' />
      </p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          streetNumber: '',
          streetName: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => signupValidation(values)}
        validationSchema={SignupSchema}
      >
        {() => (
          <Form>
            {' '}
            {signupSuccess && <FormSuccess text={signupSuccess} />}{' '}
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
            <Label text='Street Number' />
            <FormInput
              ariaLabel='Street Number'
              name='streetNumber'
              type='text'
              placeholder='Street Number'
            />
            <Label text='Street Name' />
            <FormInput
              ariaLabel='Street Name'
              name='streetName'
              type='text'
              placeholder='Street Name'
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
            <GradientButton type='submit' text='Sign Up' loading={loading} />
          </Form>
        )}
      </Formik>
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
