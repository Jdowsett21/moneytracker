import React, { useEffect } from 'react';
import { getBudgets } from '../../../actions/BudgetActions';
import { connect } from 'react-redux';
import BudgetCardItem from './BudgetCardItem';
import {
  getMonthsTransactions,
  getTransactionCategories,
  getTransactionTotalByCategory,
  setMonthNet,
} from '../../../actions/transactionActions';
import moment from 'moment';
function BudgetCardList({
  getBudgets,
  setMonthNet,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
  transactions: { categoryTotals, monthTransactions },
  budgets: { budgetList },
  time: { month },
}) {
  useEffect(() => {
    getBudgets();
    getMonthsTransactions(moment().format('MMM'));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setMonthNet(month);
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
  setMonthNet,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
})(BudgetCardList);
