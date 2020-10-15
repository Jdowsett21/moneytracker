import React, { useEffect } from 'react';
import { getBudgets } from '../../../actions/BudgetActions';
import { connect } from 'react-redux';
import BudgetItem from './BudgetItem';
import {
  getMonthsTransactions,
  getTransactionCategories,
  getTransactionTotalByCategory,
  setMonthNet,
} from '../../../actions/transactionActions';

function BudgetIncomeList({
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
    getMonthsTransactions(month);
  }, [month]);

  useEffect(() => {
    setMonthNet(month);
    getTransactionCategories();
    getTransactionTotalByCategory(budgetList);
  }, [monthTransactions, budgetList]);

  return (
    <React.Fragment>
      {budgetList.map((item) => {
        return categoryTotals.map((object) => {
          if (item.category === object.category && item.category !== 'Income') {
            return (
              <BudgetItem
                budget={item}
                categoryTotal={
                  object.total < 0 ? object.total * -1 : object.total
                }
                key={item}
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
})(BudgetIncomeList);
