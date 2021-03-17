import React, { useEffect } from 'react';

import OverviewLeftColumn from '../components/Overview/OverviewLeftColumn';
import Container from '../components/common/Container';
import OverviewRightColumn from '../components/Overview/OverviewRightColumn';
import { connect } from 'react-redux';
import {
  logout,
  isUserAuthenticated,
  setAuthInfo,
} from '../actions/authActions';

import moment from 'moment';
function Overview({ isUserAuthenticated, setAuthInfo }) {
  useEffect(() => {
    // setAuthInfo();
    // isUserAuthenticated();
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

export default connect(null, {
  logout,
  setAuthInfo,
  isUserAuthenticated,
})(Overview);
