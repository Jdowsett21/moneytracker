import React, { useEffect } from 'react';
import Card from '../../common/Card';
import CardHeader from './../../common/CardHeader';
import CardBody from './../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';
import LineGraph from '../../../canvasGraphs/LineGraph';
import { connect } from 'react-redux';
import { setOverviewGraph } from '../../../actions/GraphActions';
function SpendingCard({ setOverviewGraph, accounts: { cash } }) {
  useEffect(() => {
    setOverviewGraph();
  }, [cash]);
  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Spending' />
      </CardHeader>
      <CardBody>
        <LineGraph />
      </CardBody>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  accounts: state.accounts,
});
export default connect(mapStateToProps, { setOverviewGraph })(SpendingCard);
