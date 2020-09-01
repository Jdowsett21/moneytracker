import React from 'react';
import CardHeader from '../../common/CardHeader';
import Card from './../../common/Card';
import OverviewCardHeader from '../OverviewCardHeader';
import CardBody from '../../common/CardBody';

function FeedbackCard(props) {
  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Feedback' />
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default FeedbackCard;
