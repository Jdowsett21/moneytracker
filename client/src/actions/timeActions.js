import {
  SET_MONTH,
  SET_HOVERED_MONTH,
  SET_HOVERED_BUDGET_MONTH,
  SET_TIME_INFO,
} from './types';

export const setHoveredMonth = (index) => {
  return {
    type: SET_HOVERED_MONTH,
    payload: index,
  };
};

export const setTimeInfo = (timeInfo) => {
  return {
    type: SET_TIME_INFO,
    payload: timeInfo,
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
