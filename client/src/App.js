import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './store';

//context
import { FetchProvider } from './context/fetchContext';

//pages
import Login from './pages/Login';
import AuthenticatedRoutes from './AuthenticatedRoutes';
// import AdminRoutes from './AdminRoutes';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AppShell from './AppShell';
const Overview = lazy(() => import('./pages/Overview'));
const Transactions = lazy(() => import('./pages/Transactions'));
const AddAccount = lazy(() => import('./pages/AddAccount'));
const Trends = lazy(() => import('./pages/Trends'));
const Goals = lazy(() => import('./pages/Goals'));
const WaysToSave = lazy(() => import('./pages/WaysToSave'));
const Budgets = lazy(() => import('./pages/Budgets.js'));
const Settings = lazy(() => import('./pages/Settings.js'));
const Profile = lazy(() => import('./pages/Profile.js'));
const AddTransactions = lazy(() => import('./pages/AddTransactions.js'));

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
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <AuthenticatedRoutes path='/overview'>
          <Overview />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/transactions'>
          <Transactions />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/goals'>
          <Goals />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/budgets'>
          <Budgets />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/trends'>
          <Trends />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/waystosave'>
          <WaysToSave />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/accounts'>
          <AddAccount />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/settings'>
          <Settings />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/profile'>
          <Profile />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/tour'>
          <Profile />
        </AuthenticatedRoutes>
        <AuthenticatedRoutes path='/addTransactions'>
          <AddTransactions />
        </AuthenticatedRoutes>

        <UnauthenticatedRoutes />
      </Switch>
    </Suspense>
  </React.Fragment>
);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <FetchProvider>
          <AppRoutes />
        </FetchProvider>
      </Provider>
    </Router>
  );
}

export default App;
