import React, { useEffect } from 'react';
import { isUserAuthenticated, setAuthInfo } from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import HomeNavBar from '../components/Home/HomeNavBar';
import HomeHeader from './../components/Home/HomeHeader';
import BudgetSection from '../components/Home/BudgetSection';
import TrackSection from './../components/Home/TrackSection';
import SignupSection from './../components/Home/SignupSection';
import AnalyzeSection from '../components/Home/AnalyzeSection';
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
      {isAuthenticated && <Redirect to='/transactions' />}
      <div className='logo-background'>
        <HomeNavBar />
        <HomeHeader />
      </div>
      <TrackSection />
      <BudgetSection />
      <AnalyzeSection />
      <SignupSection />
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
