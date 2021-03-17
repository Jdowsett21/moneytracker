import React from 'react';
// import NavBarSecondary from './components/common/NavBarSecondary';
import NavbarTop from './components/common/NavbarTop';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
function AuthenticatedNavBar({ auth: { isAuthenticated } }) {
  return (
    <div>
      {/* viewing */}
      <NavbarTop />
      {/* secure version */}
      {/* {isAuthenticated === false && <Redirect to='/' />}
      {isAuthenticated && (
        <>
          <NavbarTop />
        </>
      )} */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(AuthenticatedNavBar);
