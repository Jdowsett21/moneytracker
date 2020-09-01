import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { addTransaction } from '../actions/transactionActions';
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
import FormInput from '../components/FormInput';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';

const TransactionSchema = Yup.object().shape({
  accountName: Yup.string().required('Account Name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  amount: Yup.string().required('Amount is required'),
});

function AddTransactions({
  auth: { isAuthenticated, loading },
  isUserAuthenticated,
  setAuthInfo,
  addTransaction,
  isAdmin,
}) {
  useEffect(() => {
    isUserAuthenticated();
    return () => {
      setAuthInfo();
      isAdmin();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {!isAuthenticated && <Redirect to='/' />}
      <NavbarTop />
      <NavBarSecondary />

      <Formik
        initialValues={{
          accountName: '',
          description: '',
          category: '',
          amount: '',
        }}
        onSubmit={(values) => addTransaction(values)}
        validationSchema={TransactionSchema}
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
            <Label text='Description' />
            <FormInput
              ariaLabel='Description'
              name='description'
              type='text'
              placeholder='Description'
            />

            <Label text='Category' />
            <FormInput
              ariaLabel='Category'
              name='category'
              type='text'
              placeholder='Category'
            />
            <Label text='Amount' />
            <FormInput
              ariaLabel='Amount'
              name='amount'
              type='text'
              placeholder='Amount'
            />
            <GradientButton
              type='submit'
              text='Add Transaction'
              loading={loading}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
AddTransactions.propTypes = {
  auth: PropTypes.object.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addTransaction,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
})(AddTransactions);
