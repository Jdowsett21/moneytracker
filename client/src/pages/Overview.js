import React, { useEffect } from 'react';

import NavbarTop from '../components/common/NavbarTop';
import NavBarSecondary from '../components/common/NavBarSecondary';

import OverviewLeftColumn from '../components/Overview/OverviewLeftColumn';
import Container from '../components/common/Container';
import OverviewRightColumn from '../components/Overview/OverviewRightColumn';
import { connect } from 'react-redux';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';
import { Redirect } from 'react-router-dom';

function Overview({
  isUserAuthenticated,
  auth: { isAuthenticated },
  setAuthInfo,
}) {
  useEffect(() => {
    setAuthInfo();
    isUserAuthenticated();
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <section>
        <Container>
          <OverviewLeftColumn />
          <OverviewRightColumn />
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
  isUserAuthenticated,
})(Overview);
