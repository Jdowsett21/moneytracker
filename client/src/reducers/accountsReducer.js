import {
  FILTER_ACCOUNT_TYPES,
  ADD_ACCOUNT,
  SET_CASH,
  SET_DEBT,
  SET_ACCOUNT_LOADING,
  ACCOUNT_ERROR,
  SET_TOTAL,
  GET_ACCOUNTS,
  SET_CASH_PERCENTAGE_BAR,
  SET_DEBT_PERCENTAGE_BAR,
  SET_GRAPH_ACCOUNTS,
  SET_NET_PERCENTAGE_BAR,
} from '../actions/types';

const initialState = {
  accountList: [],
  accountGraphList: [],
  accountCategories: null,
  cash: 0,
  debt: 0,
  total: 0,
  cashPercent: 0.0001,
  debtPercent: 0.0001,
  totalPercent: 0.0001,
  accountLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRAPH_ACCOUNTS:
      return {
        ...state,
        accountGraphList: action.payload,
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        loading: true,
        accountList: [...state.accountList, action.payload],
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        loading: true,
        accountList: action.payload.map((account) =>
          account.balance < 0
            ? {
                ...account,
                balance: account.balance * -1,
              }
            : account
        ),
      };
    case FILTER_ACCOUNT_TYPES:
      return {
        ...state,
        accountCategories: [
          ...new Set(
            state.accountList.map((account) => account.accountCategory)
          ),
        ],
      };
    case ACCOUNT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CASH:
      return {
        ...state,
        cash: state.accountList
          .filter((account) => account.accountCategory === 'Cash')
          .reduce((accumulator, accounts) => accounts.balance + accumulator, 0),
      };

    case SET_DEBT:
      return {
        ...state,
        debt: state.accountList
          .filter(
            (account) =>
              account.accountCategory === 'Credit' ||
              account.accountType === 'Loan'
          )
          .reduce((accumulator, accounts) => accounts.balance + accumulator, 0),
      };
    case SET_TOTAL:
      return {
        ...state,
        total:
          state.cash < state.debt
            ? state.debt - state.cash
            : state.cash - state.debt,
      };
    case SET_CASH_PERCENTAGE_BAR:
      return {
        ...state,
        cashPercent:
          state.cash > state.debt
            ? '75%'
            : `${(state.cash / state.debt) * 75}%`,
      };
    case SET_DEBT_PERCENTAGE_BAR:
      return {
        ...state,
        debtPercent:
          state.cash < state.debt
            ? '75%'
            : `${(state.debt / state.cash) * 75}%`,
      };
    case SET_NET_PERCENTAGE_BAR:
      return {
        ...state,
        totalPercent:
          state.cash > state.debt
            ? `${(state.total / state.cash) * 75}%`
            : `${(state.total / state.debt) * 75}%`,
      };
    case SET_ACCOUNT_LOADING:
      return {
        ...state,
        accountLoading: true,
      };

    default:
      return state;
  }
};
