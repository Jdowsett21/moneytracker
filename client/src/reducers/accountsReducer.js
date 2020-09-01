import {
  FILTER_ACCOUNT_TYPES,
  ADD_ACCOUNT,
  SET_CASH,
  SET_DEBT,
  SET_TOTAL,
  GET_ACCOUNTS,
  SET_CASH_PERCENTAGE_BAR,
  SET_DEBT_PERCENTAGE_BAR,
  SET_NET_PERCENTAGE_BAR,
} from '../actions/types';

const initialState = {
  accountList: [],
  accountCategories: null,
  cash: 0,
  debt: 0,
  total: 0,
  cashPercent: 0.0001,
  debtPercent: 0.0001,
  totalPercent: 0.0001,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accountList: [...state.accountList, action.payload],
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

    case GET_ACCOUNTS:
      return {
        ...state,
        accountList: action.payload.map((account) =>
          account.balance < 0
            ? {
                ...account,
                balance: account.balance * -1,
              }
            : account
        ),
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

    default:
      return state;
  }
};
