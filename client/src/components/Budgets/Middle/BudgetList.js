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

function BudgetList({
  getBudgets,
  type,
  setMonthNet,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
  transactions: { categoryTotals, monthTransactions },
  budgets: { budgetList },
  months: { month },
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
      <div className='my-3 pt-2 ' style={{ borderTop: '1px solid grey' }}>
        {budgetList.map((item) => {
          //accounting for budgets with subcategories that are empty and
          //ensuring they are not added more than once to the budget page
          return categoryTotals.map((object) => {
            if (
              item.subCategory === object.subCategory &&
              item.category === object.category &&
              item.budgetType === type
            ) {
              return (
                <BudgetItem
                  budget={item}
                  categoryTotal={
                    // ensuring all budget totals are positive numbers
                    object.total < 0 ? object.total * -1 : object.total
                  }
                  key={item}
                />
              );
            }
          });
        })}
      </div>
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
  setMonthNet,
  getTransactionCategories,
  getMonthsTransactions,
  getTransactionTotalByCategory,
})(BudgetList);
