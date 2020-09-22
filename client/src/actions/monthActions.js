import {
  SET_MONTH,
  SET_HOVERED_MONTH,
  SET_HOVERED_BUDGET_MONTH,
} from '../actions/types';

export const setHoveredMonth = (index) => {
  return {
    type: SET_HOVERED_MONTH,
    payload: index,
  };
};

export const setHoveredBudgetMonth = (month) => {
  return {
    type: SET_HOVERED_BUDGET_MONTH,
    payload: month,
  };
};

export const setMonth = (month) => {
  return {
    type: SET_MONTH,
    payload: month,
  };
};
