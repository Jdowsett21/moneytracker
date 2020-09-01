import React, { useEffect } from 'react';
import Card from './../../common/Card';
import CardHeader from './../../common/CardHeader';
import CardBody from './../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';
import { connect } from 'react-redux';
import { getTransactions } from '../../../actions/transactionActions';
import moment from 'moment';

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
        <OverviewCardHeader title={`${moment().format('MMMM')} Budgets`} />
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default connect(null, { getTransactions })(BudgetCard);
