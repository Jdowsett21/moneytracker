import React from 'react';
import AppShell from './AppShell';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AdminRoutes({
  children,
  auth: { isAdmin, isAuthenticated },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() =>
        isAdmin && isAuthenticated ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to='/' />
        )
      }
    ></Route>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoutes);
