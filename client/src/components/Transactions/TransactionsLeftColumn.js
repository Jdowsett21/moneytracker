import React from 'react';
import Card from '../common/Card';
import CardHeader from '../common/CardHeader';
import CardBody from '../common/CardBody';

function TransactionsLeftColumn(props) {
  return (
    <React.Fragment>
      <div className='col-md-3 col-lg-4 p-5'>
        <Card classSpecifics='m-0 bg-dark'>
          <CardHeader classSpecifics='bg-dark text-white'>Type</CardHeader>
          <CardBody>
            <ul className='list-group '>
              <li className='list-group-item bg-dark '>
                <a
                  className='card-text small-font text-white'
                  href='/#'
                  style={{ float: 'left' }}
                >
                  Cash & Credit
                </a>
              </li>
              <li className='list-group-item bg-dark '>
                <a
                  className='card-text small-font text-white'
                  href='/#'
                  style={{ float: 'left' }}
                >
                  Investments
                </a>
              </li>
              <li className='list-group-item bg-dark '>
                <a
                  className='card-text small-font text-white'
                  href='/#'
                  style={{ float: 'left' }}
                >
                  Cash Only
                </a>
              </li>
              <li className='list-group-item bg-dark '>
                <a
                  className='card-text small-font text-white'
                  href='/#'
                  style={{ float: 'left' }}
                >
                  Loan
                </a>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default TransactionsLeftColumn;
