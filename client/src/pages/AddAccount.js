import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { addAccount } from '../actions/AccountActions';
import Label from './../components/common/Label';

import {
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
} from '../actions/authActions';

import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import GradientButton from '../components/common/GradientButton';
import FormInput from '../components/common/FormInput';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';

const AccountSchema = Yup.object().shape({
  accountName: Yup.string().required('Account Name is required'),
});

function AddAccount({
  auth: { isAuthenticated, loading },
  isUserAuthenticated,
  setAuthInfo,
  addAccount,
  isAdmin,
}) {
  useEffect(() => {
    isUserAuthenticated();
    return () => {
      setAuthInfo();
      isAdmin();
    };
    //eslint-disable-next-line
  }, [addAccount]);
  return (
    <React.Fragment>
      {!isAuthenticated && <Redirect to='/' />}
      <NavbarTop />
      <NavBarSecondary />

      <Formik
        initialValues={{
          accountName: '',
        }}
        onSubmit={(values) => addAccount(values)}
        validationSchema={AccountSchema}
      >
        {() => (
          <Form>
            <Label text='Account Name' />
            <FormInput
              ariaLabel='Account Name'
              name='accountName'
              type='text'
              placeholder='Account Name'
            />
            <GradientButton
              type='submit'
              text='Add Account'
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
AddAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addAccount,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
})(AddAccount);
