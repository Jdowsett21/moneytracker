import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './store';

//pages
import Login from './pages/Login';
import AuthenticatedRoutes from './AuthenticatedRoutes';
// import AdminRoutes from './AdminRoutes';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AppShell from './AppShell';
import AuthenticatedNavBar from './AuthenticatedNavBar';
import AddTransaction from './pages/AddTransaction';
const Overview = lazy(() => import('./pages/Overview'));
const Transactions = lazy(() => import('./pages/Transactions'));
const AddAccount = lazy(() => import('./pages/AddAccount'));
const Trends = lazy(() => import('./pages/Trends'));
const Goals = lazy(() => import('./pages/Goals'));
const WaysToSave = lazy(() => import('./pages/WaysToSave'));
const Budgets = lazy(() => import('./pages/Budgets.js'));
const Settings = lazy(() => import('./pages/Settings.js'));
const Profile = lazy(() => import('./pages/Profile.js'));

const LoadingFallback = () => (
  <AppShell>
    <div className='p-4'>Loading...</div>
  </AppShell>
);
const UnauthenticatedRoutes = () => (
  <Switch>
    <Route exact path='/login'>
      <Login />
    </Route>
    <Route exact path='/signup'>
      <Signup />
    </Route>
    <Route exact path='/'>
      <Home />
    </Route>
  </Switch>
);

const AppRoutes = () => (
  <React.Fragment>
    <AuthenticatedNavBar />
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        {/* <AuthenticatedRoutes path='/overview'> */}
        <Route path='/overview'>
          <Overview />
        </Route>
        {/* <AuthenticatedRoutes path='/transactions'> */}
        <Route path='/transactions'>
          <Transactions />
        </Route>
        {/* <AuthenticatedRoutes path='/goals'> */}
        <Route path='/goals'>
          <Goals />
        </Route>
        {/* <AuthenticatedRoutes path='/addTransactions'> */}
        <Route path='/addTransactions'>
          <AddTransaction />
        </Route>
        {/* <AuthenticatedRoutes path='/budgets'> */}
        <Route path='/budgets'>
          <Budgets />
        </Route>
        {/* <AuthenticatedRoutes path='/trends'> */}
        <Route path='/trends'>
          <Trends />
        </Route>
        {/* <AuthenticatedRoutes path='/waystosave'> */}
        <Route path='/waystosave'>
          <WaysToSave />
        </Route>
        {/* <AuthenticatedRoutes path='/accounts'> */}
        <Route path='/accounts'>
          <AddAccount />
        </Route>
        {/* <AuthenticatedRoutes path='/settings'> */}
        <Route path='/settings'>
          <Settings />
        </Route>
        {/* <AuthenticatedRoutes path='/profile'> */}
        <Route path='/profile'>
          <Profile />
        </Route>
        {/* <AuthenticatedRoutes path='/tour'> */}
        <Route path='/tour'>
          <Profile />
        </Route>

        <UnauthenticatedRoutes />
      </Switch>
    </Suspense>
  </React.Fragment>
);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </Router>
  );
}

export default App;
