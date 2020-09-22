import { SET_CLICK } from '../actions/types';

const initialState = {
  clickStatus: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICK:
      return {
        ...state,
        clickStatus: action.payload,
      };
    default:
      return state;
  }
};
