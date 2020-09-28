import React, { useEffect } from 'react';
import TransactionTable from './TransactionTable';
import { connect } from 'react-redux';
import { getBudgetCategories } from './../../actions/BudgetCategoriesActions';
import { setCash, setDebt } from '../../actions/AccountActions';

function TransactionsRightColumn({
  getBudgetCategories,
  accounts: { cash, debt, accountList },
  setCash,
  setDebt,
}) {
  useEffect(() => {
    setCash();
    setDebt();
    //eslint-disable-next-line
  }, [accountList]);

  const setBudgetList = () => {
    getBudgetCategories();
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  return (
    <React.Fragment>
      <div className='col-md-6 col-lg-7 py-5'>
        <div className='border-bottom d-flex'>
          <div className='mr-auto align-self-center'>
            <h2>All Cash & Credit Accounts</h2>
            <p className='medium-font'>{`You have ${accountList.length} accounts`}</p>
          </div>
          {/* <div className='ml-auto align-self-center'>
            <nav className='navbar '>
              <form className='form-inline'>
                <input
                  className='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button
                  className='btn btn-outline-success my-2 my-sm-0'
                  type='submit'
                >
                  Search
                </button>
              </form>
            </nav>
          </div> */}
        </div>
        <div className='d-flex'>
          <div className='align-self-center p-2'>
            <span className='small-medium-font-grey'>TOTAL CASH</span>
            <h2 className='text-success large-font'>{formatMoney(cash)}</h2>
          </div>
          <div className='align-self-center p-2'>
            <span className='small-medium-font-grey'>TOTAL DEBT</span>
            <h2 className='large-font'>{`-${formatMoney(debt)}`}</h2>
          </div>
        </div>
        <button
          className='btn btn-outline-secondary my-3'
          data-toggle='modal'
          data-target='#addTransaction'
          type='button'
          onClick={setBudgetList}
        >
          + Transaction
        </button>
        <TransactionTable />
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  accounts: state.accounts,
});
export default connect(mapStatetoProps, {
  getBudgetCategories,
  setCash,
  setDebt,
})(TransactionsRightColumn);
