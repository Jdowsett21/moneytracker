import React, { useEffect } from 'react';
import BudgetsLeftColumn from '../components/Budgets/BudgetsLeftColumn';
import BudgetsMiddleColumn from '../components/Budgets/BudgetsMiddleColumn';
import BudgetsRightColumn from '../components/Budgets/BudgetsRightColumn';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';

import { connect } from 'react-redux';
import { getTransactions } from './../actions/transactionActions';

function Budgets({ isUserAuthenticated, setAuthInfo, time: { month } }) {
  useEffect(() => {
    // setAuthInfo();
    // isUserAuthenticated();
    //eslint-disable-next-line
  }, [month]);

  return (
    <React.Fragment>
      <div className='container-fluid fixed-bottom-container m-auto'>
        <div className='row d-flex justify-content-start'>
          <BudgetsLeftColumn />
          <BudgetsMiddleColumn />
          <BudgetsRightColumn />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
  time: state.time,
});

export default connect(mapStateToProps, {
  logout,
  setAuthInfo,
  isUserAuthenticated,
  getTransactions,
})(Budgets);
