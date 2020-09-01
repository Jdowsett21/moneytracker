import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  SET_MONTH_NET,
  GET_TRANSACTIONS_BY_MONTH,
  GET_TRANSACTION_CATEGORIES,
  SET_6_MONTH_NET,
  GET_TRANSACTIONS_BY_CATEGORY,
  GET_TRANSACTION_CATEGORY_TOTALS,
  SET_MONTH_TOTALS,
  SET_6_MONTH_MAX,
  SET_MONTH_NET_PERCENT,
} from '../actions/types';
import { authAxios } from '../utils/authFetch';

export const getTransactions = () => async (dispatch) => {
  const { data } = await authAxios.get('/transactions');
  dispatch({ type: GET_TRANSACTIONS, payload: data });
};

export const addTransaction = (transaction) => async (dispatch) => {
  const { data } = await authAxios.post('/transactions', transaction);
  dispatch({
    type: ADD_TRANSACTION,
    payload: data,
  });
};

export const getMonthsTransactions = (month) => async (dispatch) => {
  const { data } = await authAxios.get(`/transactions/month/${month}`);

  dispatch({ type: GET_TRANSACTIONS_BY_MONTH, payload: data });
};
export const getCategoryTransactions = (category) => async (dispatch) => {
  const { data } = await authAxios.get(`/transactions/category/${category}`);

  dispatch({ type: GET_TRANSACTIONS_BY_CATEGORY, payload: data });
};

export const getTransactionCategories = () => {
  return {
    type: GET_TRANSACTION_CATEGORIES,
  };
};

export const getTransactionTotalByCategory = () => {
  return {
    type: GET_TRANSACTION_CATEGORY_TOTALS,
  };
};
export const setMonthNet = () => {
  return {
    type: SET_MONTH_NET,
  };
};

export const setSixMonthMax = () => {
  return {
    type: SET_6_MONTH_MAX,
  };
};
export const setSixMonthNet = () => {
  return {
    type: SET_6_MONTH_NET,
  };
};
export const setMonthTotals = (month) => {
  return { type: SET_MONTH_TOTALS, payload: month };
};

export const setMonthNetPercent = () => {
  return { type: SET_MONTH_NET_PERCENT };
};
