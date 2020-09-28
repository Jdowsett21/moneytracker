import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTION,
  SET_TRANSACTION_LOADING,
  SET_MONTH_NET,
  TRANSACTION_ERROR,
  GET_NON_BUDGETED_INCOME_SUM,
  GET_NON_BUDGETED_SPENDING_SUM,
  SET_HOVERED_MONTH_COLOR,
  GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY,
  GET_INCOME_SUM_BY_MONTH_TYPE,
  GET_SPENDING_SUM_BY_MONTH_TYPE,
  GET_TRANSACTIONS_BY_MONTH,
  SET_SELECTED_TRANSACTION,
  GET_TRANSACTION_CATEGORIES,
  ALLOW_TRANSACTION_RE_RENDER,
  GET_TRANSACTIONS_BY_ACCOUNT,
  SET_TRANSACTION_LIST_NO_BUDGET,
  GET_NON_BUDGETED_SPENDING_TRANSACTIONS,
  GET_NON_BUDGETED_INCOME_TRANSACTIONS,
  SET_6_MONTH_NET,
  GET_TRANSACTIONS_BY_CATEGORY,
  GET_TRANSACTION_CATEGORY_TOTALS,
  SET_MONTH_TOTALS,
  SET_6_MONTH_MAX,
  SET_MONTH_NET_PERCENT,
  PREVENT_TRANSACTION_RE_RENDER,
  SET_TRANSACTION_LIST_BY_CATEGORY,
  SET_TRANSACTION_LIST_BY_ACCOUNT,
} from '../actions/types';
import moment from 'moment';
const initialState = {
  transactionList: [],
  hoveredTransactionList: [],
  monthNet: null,
  monthGraphNet: null,
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
  monthNetColor: null,
  monthTransactions: [],
  transactionLoading: false,
  hoveredColor: null,
  error: null,
  spendingSum: 0,
  //spending transactions with no budget category
  nonBudgetedIncomeTransactions: [],
  nonBudgetedSpendingTransactions: [],
  nonBudgetedTransferTransactions: [],
  incomeSum: 0,
  nonBudgetedIncomeSum: 0,
  nonBudgetedSpendingSum: 0,
  //transaction that is clicked on in transaction table
  selectedTransaction: '',
  preventTransactionReRender: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactionList: state.transactionList.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
      };
    case GET_TRANSACTIONS_BY_ACCOUNT_CATEGORY:
      return {
        ...state,
        transactionList: action.payload,
      };
    case SET_SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.payload,
      };

    case GET_TRANSACTIONS_BY_ACCOUNT:
      return {
        ...state,
        transactionList: action.payload,
      };
    case SET_MONTH_NET:
      return {
        ...state,
        monthNet: action.payload.reduce(
          (accumulator, transaction) => transaction.amountValue + accumulator,
          0
        ),
        monthNetColor:
          action.payload.reduce(
            (accumulator, transaction) => transaction.amountValue + accumulator,
            0
          ) >= 0
            ? '#40c740'
            : '#bc1c04',
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

    //needed to combine income debt and net into one transaction in order to properly set each value
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
                return transaction.amountValue + accumulator;
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
                return (transaction.amountValue + accumulator) * -1;
              } else return 0 + accumulator;
            }, 0),
        monthGraphNet:
          state.transactionList &&
          state.transactionList
            .filter(
              (transaction) =>
                action.payload === transaction.shortDate.split(',')[0]
            )
            .reduce(
              (accumulator, transaction) =>
                transaction.amountValue + accumulator,
              0
            ),
      };

    //this action is to determine the top and bottom value of the graph in the overview trends card for month net
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

    //only add to sum if it is a budget item
    case GET_SPENDING_SUM_BY_MONTH_TYPE:
      return {
        ...state,
        spendingSum: action.payload.data
          .filter((transaction) =>
            action.payload.budgetList.some(
              (budget) => transaction.category === budget.category
            )
          )
          .reduce(
            (accumulator, transaction) => accumulator + transaction.amount,
            0
          ),
      };
    //include all income
    case GET_INCOME_SUM_BY_MONTH_TYPE:
      return {
        ...state,
        incomeSum: action.payload.data
          .filter((transaction) =>
            action.payload.budgetList.some(
              (budget) => transaction.category === budget.category
            )
          )
          .reduce(
            (accumulator, transaction) => transaction.amount + accumulator,
            0
          ),
      };

    //non budgeted spending AND Transfers
    case GET_NON_BUDGETED_SPENDING_TRANSACTIONS:
      return {
        ...state,
        nonBudgetedSpendingTransactions: action.payload.data.filter(
          (transaction) =>
            !action.payload.budgetList.some(
              (budget) =>
                transaction.subCategory === budget.subCategory &&
                transaction.category === budget.category
            )
        ),
      };

    //slist of non budgeted income transactions
    case GET_NON_BUDGETED_INCOME_TRANSACTIONS:
      return {
        ...state,
        nonBudgetedIncomeTransactions: action.payload.data.filter(
          (transaction) =>
            !action.payload.budgetList.some(
              (budget) =>
                transaction.subCategory === budget.subCategory &&
                transaction.category === budget.category
            )
        ),
      };

    //sum of non budgeted income
    case GET_NON_BUDGETED_INCOME_SUM:
      return {
        ...state,
        nonBudgetedIncomeSum: action.payload.data
          .filter(
            (transaction) =>
              !action.payload.budgetList.some(
                (budget) =>
                  transaction.subCategory === budget.subCategory &&
                  transaction.category === budget.category
              )
          )
          .reduce(
            (accumulator, currentValue) =>
              currentValue.amountValue + accumulator,
            0
          ),
      };

    //sum of non budgeted spending items
    //cant use .amount because then transfers will be
    //included in total value
    //need to use .amountValue so transfers are worth 0
    //then multiply by -1
    case GET_NON_BUDGETED_SPENDING_SUM:
      return {
        ...state,
        nonBudgetedSpendingSum: action.payload.data
          .filter(
            (transaction) =>
              !action.payload.budgetList.some(
                (budget) =>
                  transaction.subCategory === budget.subCategory &&
                  transaction.category === budget.category
              )
          )
          .reduce(
            (accumulator, currentValue) =>
              (accumulator + currentValue.amountValue) * -1,
            0
          ),
      };

    //this action is used to determine the height of the bars for the month net graph on the overview page
    case SET_MONTH_NET_PERCENT:
      return {
        ...state,
        monthNetPercent:
          state.monthIncome > state.monthDebt
            ? `${(state.total / state.monthIncome) * 75}%`
            : `${(state.total / state.monthDebt) * 75}%`,
      };

    //http post request to add an account
    case ADD_TRANSACTION:
      return {
        ...state,
        transactionList: [...state.transactionList, action.payload],
        transactionLoading: false,
        error: null,
      };

    //http get request for all accounts
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactionList: action.payload,
        transactionLoading: false,
        error: null,
      };

    //http request for a single months transactions in order to determine color
    //on hover for the month net on the budgets page
    //setting color for hovered month in budget page, state was setting it too early
    //and for previous month
    case SET_HOVERED_MONTH_COLOR:
      return {
        ...state,
        hoveredColor:
          action.payload === ''
            ? '#e9ecef'
            : action.payload.reduce(
                (accumulator, transaction) =>
                  transaction.amountValue + accumulator,
                0
              ) >= 0
            ? '#40c740'
            : '#bc1c04',

        transactionLoading: false,
        error: null,
      };

    //if http request has an error
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_TRANSACTIONS_BY_MONTH:
      return {
        ...state,
        monthTransactions: action.payload,
      };

    //filtering transactions by category
    case GET_TRANSACTIONS_BY_CATEGORY:
      return {
        ...state,
        transactionsByCategory: action.payload,
      };

    //array of categories in order to map with budget categories in budgets page
    case GET_TRANSACTION_CATEGORIES:
      return {
        ...state,
        transactionCategories: [
          ...new Set(
            state.monthTransactions.map((transaction) => transaction.category)
          ),
        ],
      };

    //setting category total inside the budget bar, if there are no transactions of that
    //category then the category total is set to 0
    //this creates an array of objects with the category and the total for the month
    //that is  selected in the budget page
    //this is then mapped out in progress bars

    case GET_TRANSACTION_CATEGORY_TOTALS:
      return {
        ...state,
        categoryTotals: action.payload.map((budget) => {
          return state.monthTransactions.length === 0
            ? {
                category: budget.category,
                subCategory: budget.subCategory,
                total: 0,
              }
            : {
                category: budget.category,
                subCategory: budget.subCategory,
                total: state.monthTransactions
                  .filter(
                    (transaction) =>
                      //ensuring categories with no subcategory are not all summed together and instead filtered by subcategory
                      transaction.subCategory === budget.subCategory &&
                      transaction.category === budget.category
                  )
                  //eslint-disable-next-line
                  .reduce((accumulator, transaction) => {
                    if (
                      transaction.subCategory === budget.subCategory &&
                      transaction.category === budget.category
                    ) {
                      return transaction.amountValue + accumulator;
                    }
                  }, 0),
              };
        }),
      };

    case ALLOW_TRANSACTION_RE_RENDER:
      return {
        ...state,
        preventTransactionReRender: false,
      };

    //when you click on everything else or other income
    //on budgets page underneath budget progress bars
    //takes you to transactions page with those budgets
    case SET_TRANSACTION_LIST_NO_BUDGET:
      return {
        ...state,
        transactionList: action.payload.transactions.filter(
          (transaction) =>
            transaction.shortDate.split(',')[0] === action.payload.month
        ),
        //this ensures that when clicking on the other items
        //button in the budgets page, all transactions are not loaded
      };

    case PREVENT_TRANSACTION_RE_RENDER:
      return {
        ...state,
        preventTransactionReRender: true,
      };
    case SET_TRANSACTION_LIST_BY_CATEGORY:
      return {
        ...state,
        transactionList: action.payload,
      };
    case SET_TRANSACTION_LIST_BY_ACCOUNT:
      return {
        ...state,
        transactionList: action.payload,
      };

    //loading bar for page
    case SET_TRANSACTION_LOADING:
      return {
        ...state,
        transactionLoading: true,
      };

    default:
      return state;
  }
};
