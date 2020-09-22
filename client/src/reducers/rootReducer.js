import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import accountsReducer from '../reducers/accountsReducer';
import transactionsReducer from '../reducers/transactionsReducer';
import monthsReducer from '../reducers/monthsReducer';
import budgetReducer from '../reducers/budgetReducer';
import budgetCategoriesReducer from '../reducers/budgetCategoriesReducer';
import clickReducer from '../reducers/clickReducer';
export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  months: monthsReducer,
  budgets: budgetReducer,
  budgetCategories: budgetCategoriesReducer,
  clickable: clickReducer,
});
