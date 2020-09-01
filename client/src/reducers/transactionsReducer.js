import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  SET_MONTH_NET,
  GET_TRANSACTIONS_BY_CATEGORY,
  GET_TRANSACTION_CATEGORY_TOTALS,
  GET_TRANSACTION_CATEGORIES,
  SET_6_MONTH_MAX,
  GET_TRANSACTIONS_BY_MONTH,
  SET_6_MONTH_NET,
  SET_MONTH_NET_PERCENT,
  SET_MONTH_TOTALS,
} from '../actions/types';
import moment from 'moment';
const initialState = {
  transactionList: [],
  monthNet: 0,
  monthIncome: 0,
  monthDebt: 0,
  sixMonthNetTotals: 0,
  lastSixMonths: [
    moment().subtract(5, 'months').format('MMM'),
    moment().subtract(4, 'months').format('MMM'),
    moment().subtract(3, 'months').format('MMM'),
    moment().subtract(2, 'months').format('MMM'),
    moment().subtract(1, 'months').format('MMM'),
    moment().format('MMM'),
  ],
  sixMonthMaxNet: 0,
  transactionCategories: [],
  categoryTotals: [],
  monthTransactions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MONTH_NET:
      return {
        ...state,
        monthNet: state.monthIncome - state.monthDebt,
      };

    //created amount.Value in transaction schema to easily determine net without
    //having to determine income and debt
    //month totals still determines all three as all three are needed for that action
    case SET_6_MONTH_NET:
      return {
        ...state,
        sixMonthNetTotals: state.lastSixMonths.map((month) => {
          return (
            state.transactionList &&
            state.transactionList
              .filter(
                (transaction) => month === transaction.shortDate.split(',')[0]
              )
              .reduce(
                (accumulator, transaction) =>
                  transaction.amountValue + accumulator,
                0
              )
          );
        }),
      };

    case SET_MONTH_TOTALS:
      return {
        ...state,
        monthIncome:
          state.transactionList &&
          state.transactionList
            .filter(
              (transaction) =>
                action.payload === transaction.shortDate.split(',')[0]
            )
            .reduce((accumulator, transaction) => {
              if (transaction.paymentType === 'Deposit') {
                return transaction.amount + accumulator;
              } else return 0 + accumulator;
            }, 0),
        monthDebt:
          state.transactionList &&
          state.transactionList
            .filter(
              (transaction) =>
                action.payload === transaction.shortDate.split(',')[0]
            )
            .reduce((accumulator, transaction) => {
              if (transaction.paymentType === 'Withdrawal') {
                return transaction.amount + accumulator;
              } else return 0 + accumulator;
            }, 0),
        monthNet: state.monthIncome - state.monthDebt,
      };

    case SET_6_MONTH_MAX:
      return {
        ...state,
        sixMonthMax:
          state.sixMonthNetTotals &&
          state.sixMonthNetTotals.length > 0 &&
          state.sixMonthNetTotals
            .map((amount) => (amount < 0 ? amount * -1 : amount))
            .reduce((previousValue, currentValue) =>
              previousValue > currentValue ? previousValue : currentValue
            ),
      };
    case SET_MONTH_NET_PERCENT:
      return {
        ...state,
        monthNetPercent:
          state.monthIncome > state.monthDebt
            ? `${(state.total / state.monthIncome) * 75}%`
            : `${(state.total / state.monthDebt) * 75}%`,
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactionList: [...state.transactionList, action.payload],
      };

    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionList: action.payload,
      };

    case GET_TRANSACTIONS_BY_MONTH:
      return {
        ...state,
        transactionList: action.payload,
      };
    case GET_TRANSACTIONS_BY_CATEGORY:
      return {
        ...state,
        transactionsByCategory: action.payload,
      };

    case GET_TRANSACTION_CATEGORIES:
      return {
        ...state,
        transactionCategories: [
          ...new Set(
            state.transactionList.map((transaction) => transaction.category)
          ),
        ],
      };

    case GET_TRANSACTION_CATEGORY_TOTALS:
      return {
        ...state,
        categoryTotals: state.transactionCategories.map((category) => {
          return {
            category,
            total: state.transactionList
              .filter((transaction) => transaction.category === category)
              .reduce((accumulator, transaction) => {
                if (transaction.category === category) {
                  return transaction.amountValue + accumulator;
                }
              }, 0),
          };
        }),
      };

    default:
      return state;
  }
};
