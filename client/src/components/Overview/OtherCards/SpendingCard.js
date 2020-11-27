import React, { useEffect } from 'react';
import Card from '../../common/Card';
import CardHeader from './../../common/CardHeader';
import CardBody from './../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';
import LineGraph from '../../../canvasGraphs/LineGraph';
import { connect } from 'react-redux';
import { setOverviewGraph } from '../../../actions/GraphActions';
import {
  currentMonthSpending,
  lastMonthSpendingAtTodaysDate,
} from '../../../actions/transactionActions';
import moment from 'moment';
function SpendingCard({
  setOverviewGraph,
  currentMonthSpending,
  lastMonthSpendingAtTodaysDate,
  accounts: { cash },
  transactions: { currentSpending, lastMonthSpendingTodaysDate },
}) {
  useEffect(() => {
    currentMonthSpending();
    lastMonthSpendingAtTodaysDate();
    setOverviewGraph();
  }, [cash]);
  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Spending' />
      </CardHeader>
      <CardBody>
        <h3 className='medium-large-font p-2'>{`So far you've spent ${new Intl.NumberFormat(
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          }
        ).format(currentSpending)}`}</h3>
        <h4 className='medium-font-grey p-2'>{`FROM ${
          // static solution
          moment('2020-10-1').format('MMM-DD').toUpperCase()
          // dynamic solution
          // moment().date(1).format('MMMM-DD').toUpperCase
        } - ${
          moment('2020-10-21').format('MMM-DD').toUpperCase()
          // dynamic solution
          // moment().format('MMMM-DD').toUpperCase()
        }`}</h4>
        <LineGraph />
        <h3 className='medium-font p-2'>{`This time last month you'd spent ${new Intl.NumberFormat(
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          }
        ).format(lastMonthSpendingTodaysDate)}`}</h3>
      </CardBody>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  accounts: state.accounts,
  transactions: state.transactions,
});
export default connect(mapStateToProps, {
  setOverviewGraph,
  lastMonthSpendingAtTodaysDate,
  currentMonthSpending,
})(SpendingCard);
