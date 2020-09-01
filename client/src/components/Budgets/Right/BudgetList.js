import React, { useEffect } from 'react';
import { getBudgets } from '../../../actions/BudgetActions';
import { connect } from 'react-redux';
import BudgetItem from './BudgetItem';
import {
  getMonthsTransactions,
  getTransactionCategories,
  getTransactionTotalByCategory,
} from './../../../actions/transactionActions';

function BudgetList({
  getBudgets,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
  transactions: { categoryTotals, transactionList },
  budgets: { budgetList },
  months: { month },
}) {
  useEffect(() => {
    getBudgets();
    getMonthsTransactions(month);
  }, [month]);

  useEffect(() => {
    getTransactionCategories();
    getTransactionTotalByCategory();
  }, [transactionList]);

  return (
    <React.Fragment>
      {categoryTotals.map((object) => {
        return budgetList.map((item) => {
          if (item.category === object.category) {
            return (
              <BudgetItem
                item={item}
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
  months: state.months,
});

export default connect(mapStateToProps, {
  getBudgets,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
})(BudgetList);
