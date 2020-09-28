import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  addTransaction,
  getTransactions,
} from '../../actions/transactionActions';
import {
  isUserAuthenticated,
  setAuthInfo,
  isAdmin,
} from '../../actions/authActions';
import PropTypes from 'prop-types';
function AddTransactionModal({
  isUserAuthenticated,
  setAuthInfo,
  addTransaction,
  isAdmin,
  getTransactions,
  accounts: { accountList },
}) {
  useEffect(() => {
    isUserAuthenticated();

    return () => {
      setAuthInfo();
      isAdmin();
    };
    //eslint-disable-next-line
  }, []);

  const [accountName, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = () => {
    const transaction = {
      accountName: accountName.slice(0, -9),
      description,
      category,
      subCategory,
      amount,
    };
    addTransaction(transaction);
    getTransactions();
    setAccount('');
    setDescription('');
    setCategory('');
    setSubCategory('');
    setAmount('');
  };
  return (
    <div id='addTransaction' className='modal'>
      <div className='modal-dialog'>
        <div className='modal-content p-3'>
          <h2>Add Transaction</h2>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                value={description}
                className='form-control'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label htmlFor=''>Account</label>
            <div className='row'>
              <div className='input-field'>
                <select
                  name='accountName'
                  value={accountName}
                  className='browser-default'
                  onChange={(e) => setAccount(e.target.value)}
                >
                  <option value=''>Select Account</option>
                  {accountList.map((a) => (
                    <option
                      key={a._id}
                      value={`${a.accountName} ${a.hiddenAccountNumber
                        .split(' ')
                        .join('')
                        .slice(8)}`}
                    >
                      {`${a.accountName} ${a.hiddenAccountNumber
                        .split(' ')
                        .join('')
                        .slice(8)}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <label htmlFor=''>Category</label>
            <div className='dropdown'>
              <input
                className='form-control'
                type='button'
                id='dropdownCategoryMenu'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              />

              <div
                className='dropdown-menu m-0'
                aria-labelledby='dropdownCategoryMenu'
              >
                {budgetCategoryList.map((b) => (
                  <>
                    <a className='dropdown-item' href='#'>
                      <button
                        className='btn btn-primary dropdown-toggle'
                        type='button'
                        value={b.category}
                        id='dropdownSubCategory'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                        onMouseOver={() => setCategory(b.category)}
                      >
                        {b.category}
                      </button>
                    </a>
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownSubCategory'
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
                  </>
                ))}
              </div>
            </div> */}
            <div className='form-group'>
              <label htmlFor=''>Category</label>
              <input
                type='text'
                name='category'
                value={category}
                className='form-control'
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Category</label>
              <input
                type='text'
                name='subCategory'
                value={subCategory}
                className='form-control'
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Amount</label>
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
                href='/#'
                data-dismiss='modal'
                onClick={onSubmit}
                className='btn btn-primary'
              >
                Add Transaction
              </a>
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
  accounts: state.accounts,
  budgetCategories: state.budgetCategories,
});
export default connect(mapStateToProps, {
  addTransaction,
  isUserAuthenticated,
  setAuthInfo,
  getTransactions,
  isAdmin,
})(AddTransactionModal);
