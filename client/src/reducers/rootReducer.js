import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import accountsReducer from '../reducers/accountsReducer';
import transactionsReducer from '../reducers/transactionsReducer';
import timeReducer from '../reducers/timeReducer';
import budgetReducer from '../reducers/budgetReducer';
import budgetCategoriesReducer from '../reducers/budgetCategoriesReducer';
import clickReducer from '../reducers/clickReducer';
import graphReducer from './graphReducer';
export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  time: timeReducer,
  budgets: budgetReducer,
  budgetCategories: budgetCategoriesReducer,
  clickable: clickReducer,
  graphs: graphReducer,
});
