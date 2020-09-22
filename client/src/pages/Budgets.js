import React, { useEffect } from 'react';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';
import Container from '../components/common/Container';
import BudgetsLeftColumn from '../components/Budgets/BudgetsLeftColumn';
import BudgetsMiddleColumn from '../components/Budgets/BudgetsMiddleColumn';
import BudgetsRightColumn from '../components/Budgets/BudgetsRightColumn';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Budgets({
  isUserAuthenticated,
  auth: { isAuthenticated },
  setAuthInfo,
  months: { month },
}) {
  useEffect(() => {
    setAuthInfo();
    isUserAuthenticated();
    //eslint-disable-next-line
  }, [month]);

  return (
    <React.Fragment>
      <section>
        <Container margin='m-0'>
          <BudgetsLeftColumn />
          <BudgetsMiddleColumn />
          <BudgetsRightColumn />
        </Container>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  months: state.months,
});

export default connect(mapStateToProps, {
  logout,
  setAuthInfo,
  isUserAuthenticated,
})(Budgets);
