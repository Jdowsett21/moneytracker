import React, { useEffect } from 'react';
import Card from '../../common/Card';
import CardHeader from '../../common/CardHeader';
import CardBody from '../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';
import { connect } from 'react-redux';
import {
  getTransactions,
  getMonthsTransactions,
} from '../../../actions/transactionActions';
import moment from 'moment';
import BudgetCardList from './BudgetCardList';

//need an array for each budget
//need to filter array but each budget type and then reduce it to get the value

//need to have an array of the budget total
//need to be able to create a budget
function BudgetCard({ getTransactions }) {
  useEffect(() => {
    getTransactions();
  });

  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader
          // title={`${moment().format('MMMM')} Budgets`}
          title={`${moment().month(9).format('MMMM')} Budgets`}
        />
      </CardHeader>
      <CardBody>
        <BudgetCardList />
      </CardBody>
    </Card>
  );
}

const mapStatetoProps = (state) => ({
  time: state.time,
  transactions: state.transactions,
});
export default connect(mapStatetoProps, {
  getTransactions,
  getMonthsTransactions,
})(BudgetCard);
