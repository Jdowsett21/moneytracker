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
import FormInput from '../components/common/FormInput';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';

const TransactionSchema = Yup.object().shape({
  description: Yup.string().required('Transaction Name is required'),
});

function AddTransaction({
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
  }, [addTransaction]);
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
          subCategory: '',
          amount: '',
        }}
        onSubmit={(values) => addTransaction(values)}
        validationSchema={TransactionSchema}
      >
        {() => (
          <Form>
            <Label text='Description' />
            <FormInput
              ariaLabel='Description'
              name='description'
              type='text'
              placeholder='Description'
            />
            <Label text='category' />
            <FormInput
              ariaLabel='category'
              name='category'
              type='text'
              placeholder='category'
            />{' '}
            <Label text='subCategory' />
            <FormInput
              ariaLabel='subCategory'
              name='subCategory'
              defaultValue=''
              type='text'
              placeholder='subCategory'
            />{' '}
            <Label text='accountName' />
            <FormInput
              ariaLabel='accountName'
              name='accountName'
              type='text'
              placeholder='accountName'
            />{' '}
            <Label text='amount' />
            <FormInput
              ariaLabel='amount'
              name='amount'
              type='text'
              placeholder='amount'
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
AddTransaction.propTypes = {
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
})(AddTransaction);
