import React, { useEffect } from 'react';
import { isUserAuthenticated, setAuthInfo } from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      {/* {isAuthenticated && <Redirect to='/overview' />} */}

      {/* for viewing purposes */}
      <Redirect to='/overview' />
      <HomeNavBar />
      <div>
        <HomeHeader />
        <TrackSection />
        <BudgetSection />
        <AnalyzeSection />
        <SignupSection />
      </div>
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
