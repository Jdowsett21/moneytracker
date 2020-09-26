import React, { useEffect } from 'react';

import TransactionsLeftColumn from '../components/Transactions/TransactionsLeftColumn';
import TransactionsRightColumn from '../components/Transactions/TransactionsRightColumn';
import { getTransactions } from '../actions/transactionActions';
import { connect } from 'react-redux';

import AddTransactionModal from '../components/Transactions/AddTransactionModal';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';
import Container from '../components/common/Container';

function Transactions({
  isUserAuthenticated,

  setAuthInfo,
  getTransactions,
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

export default connect(null, {
  logout,
  setAuthInfo,
  getTransactions,
  isUserAuthenticated,
})(Transactions);
