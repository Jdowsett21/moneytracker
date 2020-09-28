import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTION,
  PREVENT_TRANSACTION_RE_RENDER,
  SET_TRANSACTION_LOADING,
  SET_MONTH_NET,
  TRANSACTION_ERROR,
  GET_NON_BUDGETED_INCOME_SUM,
  GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY,
  GET_NON_BUDGETED_SPENDING_SUM,
  SET_HOVERED_MONTH_COLOR,
  GET_INCOME_SUM_BY_MONTH_TYPE,
  GET_SPENDING_SUM_BY_MONTH_TYPE,
  GET_TRANSACTIONS_BY_MONTH,
  SET_TRANSACTION_LIST_NO_BUDGET,
  GET_TRANSACTION_CATEGORIES,
  GET_TRANSACTIONS_BY_ACCOUNT,
  GET_NON_BUDGETED_SPENDING_TRANSACTIONS,
  GET_NON_BUDGETED_INCOME_TRANSACTIONS,
  SET_6_MONTH_NET,
  GET_TRANSACTIONS_BY_CATEGORY,
  GET_TRANSACTION_CATEGORY_TOTALS,
  SET_SELECTED_TRANSACTION,
  SET_MONTH_TOTALS,
  SET_6_MONTH_MAX,
  SET_MONTH_NET_PERCENT,
  ALLOW_TRANSACTION_RE_RENDER,
  SET_TRANSACTION_LIST_BY_CATEGORY,
  SET_TRANSACTION_LIST_BY_ACCOUNT,
} from '../actions/types';
import { authAxios } from '../utils/authFetch';

export const setTransactionListByAccount = (account) => async (dispatch) => {
  try {
    const { data } = await authAxios.get(
      `/transactions/account/${account._id}`
    );

    dispatch({ type: SET_TRANSACTION_LIST_BY_ACCOUNT, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};
export const getTransactions = () => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get('/transactions');
    dispatch({ type: GET_TRANSACTIONS, payload: data });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

//this is used for changing the state and allowing transactions to re render
//when selecting a specific budget item or budget category
//to show those transactions, getTransactions cannot re render
export const allowTransactionReRender = () => {
  return {
    type: ALLOW_TRANSACTION_RE_RENDER,
  };
};
export const setTransactionList = (transactions, month) => {
  return {
    type: SET_TRANSACTION_LIST_NO_BUDGET,
    payload: { transactions, month },
  };
};

export const preventTransactionReRendering = () => {
  return {
    type: PREVENT_TRANSACTION_RE_RENDER,
  };
};
export const setTransactionListByCategory = (transactions, month) => async (
  dispatch
) => {
  try {
    const { data } = await authAxios.get(
      `/transactions/monthAndCategory/${transactions.category}/${month}`
    );

    dispatch({ type: SET_TRANSACTION_LIST_BY_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};
export const setSelectedTransaction = (transaction) => {
  return {
    type: SET_SELECTED_TRANSACTION,
    payload: transaction,
  };
};

export const getMonthTypeSum = (month, type, budgetList) => async (
  dispatch
) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(
      `/transactions/monthAndType/${month}/${type}`
    );
    type === 'Withdrawal'
      ? // need budget list for spending sum to only sum transactions that are
        //under a created budget category
        dispatch({
          type: GET_SPENDING_SUM_BY_MONTH_TYPE,
          payload: { data, budgetList },
        })
      : dispatch({
          type: GET_INCOME_SUM_BY_MONTH_TYPE,
          payload: { data, budgetList },
        });
  } catch (error) {
    setTransactionLoading();
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

//list of all transactions that have not been budgeted for budgets page
export const getNonBudgetedTransactions = (month, type, budgetList) => async (
  dispatch
) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(
      `/transactions/monthAndType/${month}/${type}`
    );

    type === 'Deposit'
      ? dispatch({
          type: GET_NON_BUDGETED_INCOME_TRANSACTIONS,
          payload: { data, budgetList },
        })
      : dispatch({
          type: GET_NON_BUDGETED_SPENDING_TRANSACTIONS,
          payload: { data, budgetList },
        });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

//updateTransaction

//sum of all transactions that have not been budgeted
export const getNonBudgetedTransactionsSum = (
  month,
  type,
  budgetList
) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(
      `/transactions/monthAndType/${month}/${type}`
    );
    type === 'Deposit'
      ? dispatch({
          type: GET_NON_BUDGETED_INCOME_SUM,
          payload: { data, budgetList },
        })
      : dispatch({
          type: GET_NON_BUDGETED_SPENDING_SUM,
          payload: { data, budgetList },
        });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

const setTransactionLoading = () => {
  return {
    type: SET_TRANSACTION_LOADING,
  };
};
export const setHoveredMonthColor = (month) => async (dispatch) => {
  try {
    setTransactionLoading();
    if (month !== '') {
      const { data } = await authAxios.get(`/transactions/month/${month}`);
      dispatch({ type: SET_HOVERED_MONTH_COLOR, payload: data });
    } else {
      dispatch({ type: SET_HOVERED_MONTH_COLOR, payload: '' });
    }
  } catch (error) {
    setTransactionLoading();
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.post('/transactions', transaction);
    dispatch({
      type: ADD_TRANSACTION,
      payload: data,
    });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

export const updateTransaction = (transaction) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.put(
      `transactions/updateTransaction/${transaction._id}`,
      transaction
    );
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: data,
    });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

export const getMonthsTransactions = (month) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(`/transactions/month/${month}`);

    dispatch({ type: GET_TRANSACTIONS_BY_MONTH, payload: data });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};
export const getCategoryTransactions = (category) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(`/transactions/category/${category}`);

    dispatch({ type: GET_TRANSACTIONS_BY_CATEGORY, payload: data });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

export const getAccountTransactions = (account) => async (dispatch) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(
      `/transactions/account/${account._id}`
    );
    console.log(data);
    dispatch({ type: GET_TRANSACTIONS_BY_ACCOUNT, payload: data });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

//filtering transactions by Cash, Credit etc.
export const getTransactionsByAccountCategory = (accountCategory) => async (
  dispatch
) => {
  try {
    setTransactionLoading();
    const { data } = await authAxios.get(
      `/transactions/accountCategory/${accountCategory}`
    );
    dispatch({ type: GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY, payload: data });
  } catch (error) {
    setTransactionLoading();

    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
};

export const getTransactionCategories = () => {
  return {
    type: GET_TRANSACTION_CATEGORIES,
  };
};

export const getTransactionTotalByCategory = (budgets) => {
  return {
    type: GET_TRANSACTION_CATEGORY_TOTALS,
    payload: budgets,
  };
};

export const setMonthNet = (month) => async (dispatch) => {
  try {
    const { data } = await authAxios.get(`/transactions/month/${month}`);

    dispatch({ type: SET_MONTH_NET, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response.data,
    });
  }
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
