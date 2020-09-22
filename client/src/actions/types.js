//filtering accounts card on overview
export const FILTER_ACCOUNT_TYPES = 'FILTER_ACCOUNT_TYPES';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const GET_ACCOUNTS = 'GET_ACCOUNTS';

export const ACCOUNT_ERROR = 'ACCOUNT_ERROR';
export const TRANSACTION_ERROR = 'TRANSACTION_ERROR';
export const MONTH_ERROR = 'MONTH_ERROR';

export const SET_ACCOUNT_LOADING = 'SET_ACCOUNT_LOADING';
export const SET_TRANSACTION_LOADING = 'SET_TRANSACTION_LOADING';
//calculating net totals
export const SET_CASH = 'SET_CASH';
export const SET_DEBT = 'SET_DEBT';
export const SET_TOTAL = 'SET_TOTAL';

//getting month to filter transactions/totals by
export const SET_HOVERED_MONTH = 'SET_HOVERED_MONTH';
export const SET_HOVERED_BUDGET_MONTH = 'SET_HOVERED_BUDGET_MONTH';
export const SET_MONTH = 'SET_MONTH';

export const FILTER = 'FILTER';
//setting bars on overview page
export const SET_CASH_PERCENTAGE_BAR = 'SET_CASH_PERCENTAGE_BAR';
export const SET_DEBT_PERCENTAGE_BAR = 'SET_DEBT_PERCENTAGE_BAR';
export const SET_NET_PERCENTAGE_BAR = 'SET_TOTAL_PERCENTAGE_BAR';

//setting monthly totals and percentages
export const SET_MONTH_NET_PERCENT = 'SET_MONTH_TOTAL_PERCENT;';

//used to calculate the net total
export const SET_MONTH_NET = 'SET_MONTH_NET';

//sets net total for the past 6 months

export const SET_6_MONTH_NET = 'SET_6_MONTH_NET';

//used to determine max number in month net graph in overview,
//all other bars are relative to max net for past 6 months
export const SET_6_MONTH_MAX = 'SET_6_MONTH_MAX';

//setting the hovered month net for the budgets page
export const SET_HOVERED_MONTH_NET = 'SET_HOVERED_MONTH_NET';

//sets monthly debt, income and net difference
//all actions compiled together as they cannot work on same transactions array at the same time
//in different actions
export const SET_MONTH_TOTALS = 'SET_MONTH_TOTALS';

//setting color on hover for budget page months
export const SET_HOVERED_MONTH_COLOR = 'SET_HOVERED_MONTH_COLOR';

//transactions http requests
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

//getting the toal amount of a category value for budget page
export const GET_TRANSACTION_CATEGORY_TOTALS =
  'GET_TRANSACTION_CATEGORY_TOTALS';

//filtering transactions for a certain category
export const GET_TRANSACTIONS_BY_CATEGORY = 'GET_TRANSACTIONS_BY_CATEGORY';

//getting all the transaction categories to map into the budget page
export const GET_TRANSACTION_CATEGORIES = 'GET_TRANSACTION_CATEGORIES';

//filtering for transactions in one month
export const GET_TRANSACTIONS_BY_MONTH = 'GET_TRANSACTIONS_BY_MONTH';

export const GET_TRANSACTIONS_BY_ACCOUNT = 'GET_TRANSACTIONS_BY_ACCOUNT';
export const GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY =
  '  GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY';

//sum for total non budgeted income and spending below budget bars in budget page
export const GET_NON_BUDGETED_INCOME_SUM = 'GET_NON_BUDGETED_INCOME_SUM';
export const GET_NON_BUDGETED_SPENDING_SUM = 'GET_NON_BUDGETED_SPENDING_SUM';

//total spending of categories that are budgeted
export const GET_SPENDING_SUM_BY_MONTH_TYPE = 'GET_SPENDING_SUM_BY_MONTH_TYPE';
export const GET_INCOME_SUM_BY_MONTH_TYPE = 'GET_INCOME_SUM_BY_MONTH_TYPE';
export const GET_TRANSFER_SUM_BY_MONTH_TYPE = 'GET_TRANSFER_SUM_BY_MONTH_TYPE';

//extra transactions that do not have a budget
export const GET_NON_BUDGETED_INCOME_TRANSACTIONS =
  'GET_NON_BUDGETED_INCOME_TRANSACTIONS';
export const GET_NON_BUDGETED_SPENDING_TRANSACTIONS =
  'GET_NON_BUDGETED_SPENDING_TRANSACTIONS';
export const GET_NON_BUDGETED_TRANSFER_TRANSACTIONS =
  'GET_NON_BUDGETED_TRANSFER_TRANSACTIONS';
//authentication actions
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const USER_LOADED = 'USER_LOADED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const REDIRECT_ON_LOGIN = 'REDIRECT_ON_LOGIN';
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const IS_ADMIN = 'IS_ADMIN';
export const LOADING = 'LOADING';

//adding a budget

export const ADD_BUDGET = 'ADD_BUDGET';
export const GET_BUDGETS = 'GET_BUDGETS';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const INCREMENT_BUDGET = 'INCREMENT_BUDGET';
export const DECREMENT_BUDGET = 'DECREMENT_BUDGET';

//sets income sum and spending sum for budget page
export const BUDGET_INCOME_SUM = 'BUDGET_INCOME_SUM';
export const BUDGET_SPENDING_SUM = 'BUDGET_SPENDING_SUM';

export const ADD_BUDGET_CATEGORY = 'ADD_BUDGET_CATEGORY';
export const GET_BUDGETS_CATEGORY = 'GET_BUDGETS_CATEGORY';
export const UPDATE_BUDGET_CATEGORY = 'UPDATE_BUDGET_CATEGORY';
export const DELETE_BUDGET_CATEGORY = 'DELETE_BUDGET_CATEGORY';
export const GET_BUDGET_SUBCATEGORIES = 'GET_BUDGET_SUBCATEGORIES';

//setting state so that in the left transaction column, only 1 item can
//be highlighted on click
export const SET_CLICK = 'SET_CLICK';