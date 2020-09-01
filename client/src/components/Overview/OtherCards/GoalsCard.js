import React from 'react';
import Card from './../../common/Card';
import CardHeader from './../../common/CardHeader';
import CardBody from './../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';

function GoalsCard(props) {
  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Goals' />
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default GoalsCard;
