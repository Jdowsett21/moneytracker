import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../../actions/transactionActions';

import {
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
} from '../../actions/authActions';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const TransactionSchema = Yup.object().shape({
  accountName: Yup.string().required('Account Name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  amount: Yup.string().required('Amount is required'),
});

function AddTransactionModal({
  auth: { isAuthenticated, loading },
  isUserAuthenticated,
  setAuthInfo,
  addTransaction,
  isAdmin,
  budgetCategories: { budgetCategoryList },
}) {
  useEffect(() => {
    isUserAuthenticated();

    return () => {
      setAuthInfo();
      isAdmin();
    };
    //eslint-disable-next-line
  }, []);

  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = () => {
    const transaction = {
      account,
      description,
      category,
      subCategory,
      amount,
    };
    addTransaction(transaction);
  };
  return (
    <div id='addTransaction' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <h2>Add Transaction</h2>
          <div className='modal-body'>
            <div className='d-flex justify-content-between'>
              <div className='form-group'>
                <input
                  type='text'
                  name='description'
                  value={description}
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='account'
                  value={account}
                  className='form-control'
                  onChange={(e) => setAccount(e.target.value)}
                />
              </div>
              <div className='dropdown'>
                <button
                  className='btn btn-primary dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                ></button>
                <div
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  {budgetCategoryList.map((b) => (
                    <div className=''>
                      <a className='dropdown-item' href='#'>
                        <button
                          className='btn btn-primary dropdown-toggle'
                          type='button'
                          value={b.category}
                          id='dropdownMenuButton2'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                          onMouseOver={(e) => setCategory(e.target.value)}
                        >
                          {b.category}
                        </button>
                      </a>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton2'
                      >
                        {b.subCategories.map((item) => (
                          <a
                            value={item.subCategory}
                            className='dropdown-item'
                            href='#'
                            onMouseOver={(e) => setCategory(e.target.value)}
                          >
                            {item.subCategory}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='amount'
                  value={amount}
                  className='form-control'
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className='modal-footer'>
                <a
                  href='#'
                  data-dismiss='modal'
                  onClick={onSubmit}
                  className='btn btn-primary'
                >
                  Add Transaction
                </a>
              </div>

              <ToastContainer closeOnClick />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AddTransactionModal.propTypes = {
  auth: PropTypes.object.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  budgetCategories: state.budgetCategories,
});
export default connect(mapStateToProps, {
  addTransaction,
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
})(AddTransactionModal);
