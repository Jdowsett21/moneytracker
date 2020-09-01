import React from 'react';
import Card from '../common/Card';
import CardHeader from './../common/CardHeader';
import CardBody from '../common/CardBody';
import TransactionTable from './TransactionTable';

function TransactionsRightColumn(props) {
  return (
    <React.Fragment>
      <div className='col-md-8 col-lg-7 py-5'>
        <Card>
          <CardHeader></CardHeader>
          <CardBody>
            <TransactionTable />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default TransactionsRightColumn;
