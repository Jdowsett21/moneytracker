import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import accountsReducer from '../reducers/accountsReducer';
import transactionsReducer from '../reducers/transactionsReducer';
import monthsReducer from '../reducers/monthsReducer';
import budgetReducer from '../reducers/budgetReducer';
export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  months: monthsReducer,
  budgets: budgetReducer,
});
