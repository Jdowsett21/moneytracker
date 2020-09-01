import { SET_MONTH, SET_HOVERED_MONTH } from '../actions/types';

export const setHoveredMonth = (index) => {
  return {
    type: SET_HOVERED_MONTH,
    payload: index,
  };
};

export const setMonth = (month) => {
  return {
    type: SET_MONTH,
    payload: month,
  };
};
