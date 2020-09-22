import {
  ADD_BUDGET_CATEGORY,
  GET_BUDGETS_CATEGORY,
  DELETE_BUDGET_CATEGORY,
  UPDATE_BUDGET_CATEGORY,
  GET_BUDGET_SUBCATEGORIES,
} from '../actions/types';

const initialState = {
  budgetCategoryList: [],
  budgetSubCategories: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUDGET_CATEGORY:
      return {
        ...state,
        budgetCategoryList: [...state.budgetCategoryList, action.payload],
      };

    case GET_BUDGET_SUBCATEGORIES:
      return {
        ...state,
        budgetSubCategories: action.payload,
      };
    case UPDATE_BUDGET_CATEGORY:
      return {
        ...state,
        budgetCategoryList: state.budgetCategoryList.map((budget) =>
          budget._id === action.payload._id ? action.payload : budget
        ),
      };
    case DELETE_BUDGET_CATEGORY:
      return {
        ...state,
        budgetCategoryList: action.payload,
      };

    case GET_BUDGETS_CATEGORY:
      return {
        ...state,
        budgetCategoryList: action.payload,
      };
    default:
      return state;
  }
};
