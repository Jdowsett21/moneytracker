//filtering accounts card on overview
export const FILTER_ACCOUNT_TYPES = 'FILTER_ACCOUNT_TYPES';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const GET_ACCOUNTS = 'GET_ACCOUNTS';

//calculating net totals
export const SET_CASH = 'SET_CASH';
export const SET_DEBT = 'SET_DEBT';
export const SET_TOTAL = 'SET_TOTAL';

//getting month to filter transactions/totals by
export const SET_HOVERED_MONTH = 'SET_HOVERED_MONTH';
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

//sets monthly debt, income and net difference
//all actions compiled together as they cannot work on same transactions array at the same time
//in different actions
export const SET_MONTH_TOTALS = 'SET_MONTH_TOTALS';

export const GET_TRANSACTION_CATEGORY_TOTALS =
  'GET_TRANSACTION_CATEGORY_TOTALS';
//transactions http requests
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_TRANSACTIONS_BY_CATEGORY = 'GET_TRANSACTIONS_BY_CATEGORY';
export const GET_TRANSACTION_CATEGORIES = 'GET_TRANSACTION_CATEGORIES';
export const GET_TRANSACTIONS_BY_MONTH = 'GET_TRANSACTIONS_BY_MONTH';
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
