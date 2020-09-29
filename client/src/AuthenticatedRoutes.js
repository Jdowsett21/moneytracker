import React from 'react';
import AppShell from './AppShell';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { FetchProvider } from './context/fetchContext';
function AuthenticatedRoutes({ isAuthenticated, children, ...rest }) {
  return (
    <FetchProvider>
      <Route
        {...rest}
        render={() =>
          isAuthenticated ? (
            <AppShell>{children}</AppShell>
          ) : (
            <Redirect to='/' />
          )
        }
      ></Route>
    </FetchProvider>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthenticatedRoutes);
