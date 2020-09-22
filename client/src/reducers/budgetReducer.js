import {
  ADD_BUDGET,
  GET_BUDGETS,
  DELETE_BUDGET,
  BUDGET_INCOME_SUM,
  BUDGET_SPENDING_SUM,
  INCREMENT_BUDGET,
  DECREMENT_BUDGET,
  UPDATE_BUDGET,
} from '../actions/types';

const initialState = {
  budgetList: [],
  budgetIncomeSum: 0,
  budgetSpendingSum: 0,
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
        budgetList: state.budgetList.map((budget) =>
          budget._id === action.payload._id ? action.payload : budget
        ),
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

    //sets spending and income sums for the months budget
    case BUDGET_INCOME_SUM:
      return {
        ...state,
        budgetIncomeSum: action.payload.reduce(
          (accumulator, budget) => budget.budgetLimit + accumulator,
          0
        ),
      };
    case BUDGET_SPENDING_SUM:
      return {
        ...state,
        budgetSpendingSum: action.payload.reduce(
          (accumulator, budget) => budget.budgetLimit + accumulator,
          0
        ),
      };

    case INCREMENT_BUDGET:
      return {
        ...state,
        budgetList: state.budgetList.map((budget) =>
          budget._id === action.payload._id ? action.payload : budget
        ),
      };
    case DECREMENT_BUDGET:
      return {
        ...state,
        budgetList: state.budgetList.map((budget) => {
          console.log(budget);
          return budget._id === action.payload._id ? action.payload : budget;
        }),
      };

    default:
      return state;
  }
};
