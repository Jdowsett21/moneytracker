import React, { useEffect } from 'react';
import { isUserAuthenticated, setAuthInfo } from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

function Home({
  auth: { isAuthenticated, expiresAt },
  isUserAuthenticated,
  setAuthInfo,
}) {
  useEffect(() => {
    isUserAuthenticated();
    setAuthInfo();
    //eslint-disable-next-line
  }, [expiresAt]);

  return (
    <React.Fragment>
      {isAuthenticated && <Redirect to='/budgets' />}
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  isUserAuthenticated,
  setAuthInfo,
})(Home);
