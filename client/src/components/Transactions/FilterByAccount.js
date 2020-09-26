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
          <li
            className={`list-group-item bg-${
              clickStatus === 'Accounts' ? 'success' : 'light'
            } pl-3 pt-2   text-${
              clickStatus === 'Accounts'
                ? 'white'
                : hover === 'Accounts'
                ? 'success'
                : 'dark'
            } text-decoration-none`}
            onClick={() => {
              setClick('Accounts');
            }}
            onMouseEnter={() => setHover('Accounts')}
            onMouseLeave={() => setHover('')}
          >
            <button
              className='link-button'
              onClick={() => getTransactions()}
              style={{ float: 'left' }}
            >
              <h5 className='medium-large-font'>All Accounts</h5>
              <small className='medium-font'>{`${accountList.length} accounts`}</small>
            </button>
          </li>
          {accountList.map((account) => (
            // changing font and background color
            //on click and on hover
            <li
              key={account._id}
              className={`list-group-item medium-large-font bg-${
                clickStatus === account ? 'success' : 'light'
              } px-3 py-2 
              text-${
                clickStatus === account
                  ? 'white'
                  : hover === account
                  ? 'success'
                  : 'dark'
              } text-decoration-none`}
              onClick={() => setClick(account)}
              onMouseEnter={() => setHover(account)}
              onMouseLeave={() => setHover('')}
              style={{ cursor: 'pointer' }}
            >
              <button
                className={`d-block link-button`}
                onClick={() => getAccountTransactions(account)}
              >
                {account.institution}
              </button>
              <div>
                <small onClick={() => getAccountTransactions(account)}>
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
