import {
  ADD_BUDGET_CATEGORY,
  GET_BUDGETS_CATEGORY,
  UPDATE_BUDGET_CATEGORY,
  DELETE_BUDGET_CATEGORY,
  GET_BUDGET_SUBCATEGORIES,
} from '../actions/types';
import { authAxios } from '../utils/authFetch';

export const addBudgetCategory = (budget) => async (dispatch) => {
  const { data } = await authAxios.post('/budgetCategories/add', budget);

  dispatch({
    type: ADD_BUDGET_CATEGORY,
    payload: data,
  });
};

export const getBudgetSubCategories = (category) => async (dispatch) => {
  const { data } = await authAxios.get(
    `/budgetCategories/getSubcategories/${category}`
  );

  dispatch({
    type: GET_BUDGET_SUBCATEGORIES,
    payload: data,
  });
};

export const getBudgetCategories = () => async (dispatch) => {
  const { data } = await authAxios.get('/budgetCategories');
  dispatch({
    type: GET_BUDGETS_CATEGORY,
    payload: data,
  });
};

export const updateBudgetCategory = (budget) => async (dispatch) => {
  console.log(budget);
  const { data } = await authAxios.put(
    `/budgetCategories/update/${budget._id}`,
    budget
  );

  dispatch({
    type: UPDATE_BUDGET_CATEGORY,
    payload: data,
  });
};

export const deleteBudgetCategory = (budget) => async (dispatch) => {
  const { data } = await authAxios.post(
    `/budgetCategories/delete/${budget._id}`,
    budget
  );

  dispatch({
    type: DELETE_BUDGET_CATEGORY,
    payload: data,
  });
};
