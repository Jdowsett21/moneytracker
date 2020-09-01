import React from 'react';
import AppShell from './AppShell';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
function AuthenticatedRoutes({ isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <AppShell>{children}</AppShell> : <Redirect to='/' />
      }
    ></Route>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthenticatedRoutes);
