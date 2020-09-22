import {
  ADD_BUDGET,
  GET_BUDGETS,
  BUDGET_INCOME_SUM,
  BUDGET_SPENDING_SUM,
  UPDATE_BUDGET,
  INCREMENT_BUDGET,
  DECREMENT_BUDGET,
  DELETE_BUDGET,
} from '../actions/types';
import { authAxios } from '../utils/authFetch';

export const addBudget = (budget) => async (dispatch) => {
  const { data } = await authAxios.post('/budgets/addBudget', budget);

  dispatch({
    type: ADD_BUDGET,
    payload: data,
  });
};

export const getBudgets = () => async (dispatch) => {
  const { data } = await authAxios.get('/budgets/getBudgets');

  dispatch({
    type: GET_BUDGETS,
    payload: data,
  });
};

export const incrementBudget = (budget) => async (dispatch) => {
  const { data } = await authAxios.put(
    `/budgets/incrementBudget/${budget._id}`,
    budget
  );
  dispatch({
    type: INCREMENT_BUDGET,
    payload: data,
  });
};

export const decrementBudget = (budget) => async (dispatch) => {
  const { data } = await authAxios.put(
    `/budgets/decrementBudget/${budget._id}`,
    budget
  );

  dispatch({
    type: DECREMENT_BUDGET,
    payload: data,
  });
};

export const setBudgetMonthSum = (type) => async (dispatch) => {
  const { data } = await authAxios.get(`/budgets/getBudgetType/${type}`);
  type === 'Income'
    ? dispatch({
        type: BUDGET_INCOME_SUM,
        payload: data,
      })
    : dispatch({
        type: BUDGET_SPENDING_SUM,
        payload: data,
      });
};

export const updateBudget = (budget) => async (dispatch) => {
  const { data } = await authAxios.put(
    `/budgets/updateBudget/${budget._id}`,
    budget
  );

  dispatch({
    type: UPDATE_BUDGET,
    payload: data,
  });
};

export const deleteBudget = (budget) => async (dispatch) => {
  const { data } = await authAxios.post(
    `/budgets/deleteBudget/${budget._id}`,
    budget
  );

  dispatch({
    type: DELETE_BUDGET,
    payload: data,
  });
};
