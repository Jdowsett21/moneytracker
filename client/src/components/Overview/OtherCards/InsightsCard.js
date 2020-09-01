import React from 'react';
// import insights from '../img/insights.jpg';
import Card from '../../common/Card';
import CardHeader from '../../common/CardHeader';
import OverviewCardHeader from '../OverviewCardHeader';

function InsightsCard(props) {
  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Insights For You' />
      </CardHeader>
    </Card>
  );
}

export default InsightsCard;
