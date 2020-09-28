import React, { useState } from 'react';
import Card from '../common/Card';
import CardBody from '../common/CardBody';
import { getTransactionsByAccountCategory } from '../../actions/transactionActions';

import { connect } from 'react-redux';
import { setClick } from './../../actions/ClickAction';

function AccountTypesFilter({
  clickable: { clickStatus },
  getTransactionsByAccountCategory,
  setClick,
}) {
  const [hover, setHover] = useState('');

  //object array created to make route cleaner on backend
  const accountFilters = [
    { uiName: 'Cash & Credit', backendName: 'Cash & Credit' },
    { uiName: 'Investments', backendName: 'Investment' },
    { uiName: 'Cash Only', backendName: 'Cash' },
    { uiName: 'Loan', backendName: 'Loan' },
  ];

  return (
    <Card classSpecifics='m-0 bg-light border-0'>
      <div
        className='card-header pb-3 text-dark m-0'
        style={{ backgroundColor: '#e8ebee', borderRadius: '0rem' }}
      >
        Type
      </div>
      <CardBody classSpecifics='p-0'>
        <ul
          className='list-group bg-light m-0'
          style={{ fontSize: '.9rem', borderRadius: '0rem' }}
        >
          {accountFilters.map((account) => (
            <li
              key={account.uiName}
              className={`list-group-item bg-${
                clickStatus.uiName === account.uiName ? 'success' : 'light'
              } p-2`}
              onClick={() => setClick(account)}
              onMouseEnter={() => setHover(account)}
              onMouseLeave={() => setHover('')}
            >
              {/* eslint-disable-next-line */}
              <a
                className={`text text-${
                  clickStatus.uiName === account.uiName
                    ? 'white'
                    : hover === account.uiName
                    ? 'success'
                    : 'dark'
                } text-decoration-none`}
                onClick={() => {
                  getTransactionsByAccountCategory(account.backendName);
                }}
                style={{ float: 'left' }}
              >
                {account.uiName}
              </a>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
const mapStatetoProps = (state) => ({
  clickable: state.clickable,
});
export default connect(mapStatetoProps, {
  getTransactionsByAccountCategory,
  setClick,
})(AccountTypesFilter);
