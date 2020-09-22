import { SET_CLICK } from '../actions/types';

export const setClick = (item) => {
  return {
    type: SET_CLICK,
    payload: item,
  };
};
