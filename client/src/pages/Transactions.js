import React, { useEffect } from 'react';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';
import TransactionsLeftColumn from '../components/Transactions/TransactionsLeftColumn';
import TransactionsRightColumn from '../components/Transactions/TransactionsRightColumn';
import { getTransactions } from '../actions/transactionActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AddTransactionModal from '../components/Transactions/AddTransactionModal';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';
import Container from '../components/common/Container';

function Transactions({
  isUserAuthenticated,
  auth: { isAuthenticated },
  setAuthInfo,
  getTransactions,
  getBudgetCategories,
}) {
  useEffect(() => {
    getTransactions();
    setAuthInfo();
    isUserAuthenticated();
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <section>
        <Container>
          <AddTransactionModal />
          <TransactionsLeftColumn />
          <TransactionsRightColumn />
        </Container>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  setAuthInfo,
  getTransactions,
  isUserAuthenticated,
})(Transactions);
