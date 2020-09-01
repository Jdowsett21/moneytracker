import {
  ADD_BUDGET,
  GET_BUDGETS,
  DELETE_BUDGET,
  UPDATE_BUDGET,
} from '../actions/types';

const initialState = {
  budgetList: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDGET:
      return {
        ...state,
        budgetList: [...state.budgetList, action.payload],
      };
    case UPDATE_BUDGET:
      return {
        ...state,
        budgetList: [...state.budgetList, action.payload],
      };
    case DELETE_BUDGET:
      return {
        ...state,
        budgetList: action.payload,
      };

    case GET_BUDGETS:
      return {
        ...state,
        budgetList: action.payload,
      };
    default:
      return state;
  }
};
