import React, { useEffect } from 'react';
import Card from '../../common/Card';
import CardBody from '../../common/CardBody';
import CardHeader from '../../common/CardHeader';

import OverviewCardHeader from '../OverviewCardHeader';
import NetTotalGraph from './NetGraph/NetTotalGraph';
import NetTitle from './NetGraph/NetTitle';
import MonthlyNetGraph from './MonthlyGraph/MonthlyNetGraph';
import { getTransactions } from '../../../actions/transactionActions';
import { connect } from 'react-redux';
function TrendsCard({ getTransactions }) {
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Trends' />
      </CardHeader>
      <CardBody>
        <NetTitle title={' Cash vs. Credit Card and Debt'} />
        <NetTotalGraph />
        <MonthlyNetGraph />
      </CardBody>
    </Card>
  );
}

export default connect(null, { getTransactions })(TrendsCard);
