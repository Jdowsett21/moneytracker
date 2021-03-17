import React, { useEffect } from 'react';
import { getBudgets } from '../../../actions/BudgetActions';
import { connect } from 'react-redux';
import BudgetCardItem from './BudgetCardItem';
import {
  getMonthsTransactions,
  getTransactionCategories,
  getTransactionTotalByCategory,
  setMonthNet1,
} from '../../../actions/transactionActions';
import moment from 'moment';
function BudgetCardList({
  getBudgets,
  setMonthNet1,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
  transactions: { categoryTotals, monthTransactions, transactions },
  budgets: { budgetList },
  time: { date1, date2 },
}) {
  useEffect(() => {
    getBudgets();
    getMonthsTransactions(date1, date2);

    // getMonthsTransactions(
    //   moment().toISOString(),
    //   moment().date(1).add(1, 'months').startOf('day').toISOString()
    // );
    //eslint-disable-next-line
  }, [transactions]);

  useEffect(() => {
    setMonthNet1(date1, date2);

    getTransactionCategories();
    getTransactionTotalByCategory(budgetList);
    //eslint-disable-next-line
  }, [monthTransactions, budgetList]);

  return (
    <React.Fragment>
      {budgetList.map((budget) => {
        //eslint-disable-next-line
        return categoryTotals.map((object) => {
          //overview page does not have income items
          if (
            budget.subCategory === object.subCategory &&
            budget.category === object.category &&
            budget.budgetType !== 'Income'
          ) {
            return (
              <BudgetCardItem
                budget={budget}
                categoryTotal={
                  object.total < 0 ? object.total * -1 : object.total
                }
                key={budget}
              />
            );
          }
        });
      })}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  budgets: state.budgets,
  transactions: state.transactions,
  time: state.time,
});

export default connect(mapStateToProps, {
  getBudgets,
  setMonthNet1,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
})(BudgetCardList);
