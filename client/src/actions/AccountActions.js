import {
  FILTER_ACCOUNT_TYPES,
  SET_CASH,
  ADD_ACCOUNT,
  SET_DEBT,
  SET_TOTAL,
  SET_CASH_PERCENTAGE_BAR,
  SET_DEBT_PERCENTAGE_BAR,
  SET_NET_PERCENTAGE_BAR,
  GET_ACCOUNTS,
} from '../actions/types';
import { authAxios } from '../utils/authFetch';

export const getAccounts = () => async (dispatch) => {
  const { data } = await authAxios.get('/accounts/getAccounts');
  dispatch({ type: GET_ACCOUNTS, payload: data });
};

export const addAccount = (account) => async (dispatch) => {
  const { data } = await authAxios.post('/accounts/createAccount', account);
  dispatch({
    type: ADD_ACCOUNT,
    payload: data,
  });
};
export const filterAccountTypes = () => {
  return { type: FILTER_ACCOUNT_TYPES };
};

// export const createAccount = ()
// export const getAllAccounts = ()=> async(dispatch)=> {
//   const {data} = await authAxios.get('/api')
// }

// export const getSingleAccount =()=>async(dispatch)=> {
//   const {data}= await authAxios.get(`/`)
// }

export const setCash = () => {
  return { type: SET_CASH };
};
export const setDebt = () => {
  return { type: SET_DEBT };
};
export const setTotal = () => {
  return { type: SET_TOTAL };
};

export const setCashPercent = () => {
  return { type: SET_CASH_PERCENTAGE_BAR };
};
export const setDebtPercent = () => {
  return { type: SET_DEBT_PERCENTAGE_BAR };
};
export const setTotalPercent = () => {
  return { type: SET_NET_PERCENTAGE_BAR };
};
