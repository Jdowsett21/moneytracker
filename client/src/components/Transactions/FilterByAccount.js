import React, { useState } from 'react';
import Card from '../common/Card';
import CardBody from '../common/CardBody';
import {
  getAccountTransactions,
  getTransactions,
} from '../../actions/transactionActions';
import { connect } from 'react-redux';
import { setClick } from './../../actions/ClickAction';
function FilterByAccount({
  accounts: { accountList },
  clickable: { clickStatus },
  setClick,
  getAccountTransactions,
  getTransactions,
}) {
  const [hover, setHover] = useState(false);
  return (
    <Card classSpecifics='m-0 bg-light border-0'>
      <div
        className='card-header pb-3 text-dark m-0'
        style={{ backgroundColor: '#e8ebee', borderRadius: '0rem' }}
      >
        Accounts
      </div>
      <CardBody classSpecifics='p-0'>
        <ul className='list-group  m-0' style={{ borderRadius: '0rem' }}>
          <li className='list-group-item bg-light pl-3 pt-2'>
            <a
              className='text text-dark'
              onClick={() => getTransactions()}
              href='#'
              style={{ float: 'left' }}
            >
              <h5 className='medium-large-font'>All Accounts</h5>
              <small className='medium-font'>{`${accountList.length} accounts`}</small>
            </a>
          </li>
          {accountList.map((account) => (
            <li
              className={`list-group-item medium-large-font bg-${
                clickStatus === account ? 'success' : 'light'
              } px-3 py-2`}
              onClick={() => setClick(account)}
              onMouseEnter={() => setHover(account)}
              onMouseLeave={() => setHover('')}
            >
              <a
                className={`d-block text text-${
                  clickStatus === account
                    ? 'white'
                    : hover === account
                    ? 'success'
                    : 'dark'
                } text-decoration-none`}
                onClick={() => getAccountTransactions(account)}
              >
                {account.institution}
              </a>
              <div>
                <small
                  className={` text-${
                    clickStatus === account
                      ? 'white'
                      : hover === account
                      ? 'success'
                      : 'dark'
                  }`}
                >
                  {account.accountName}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
const mapStatetoProps = (state) => ({
  accounts: state.accounts,
  clickable: state.clickable,
});
export default connect(mapStatetoProps, {
  getAccountTransactions,
  getTransactions,
  setClick,
})(FilterByAccount);
