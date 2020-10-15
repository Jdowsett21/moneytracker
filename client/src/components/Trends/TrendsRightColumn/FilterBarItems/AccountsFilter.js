import React, { useEffect, useState } from 'react';
import { getAccounts } from '../../../../actions/AccountActions';
import { connect } from 'react-redux';
import { setGraphAccounts } from './../../../../actions/AccountActions';

function AccountsFilter({
  accounts: { accountList, accountGraphList },
  setGraphAccounts,
  getAccounts,
}) {
  const [allAccounts, setAllAccounts] = useState(true);

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    setGraphAccounts(accountList);
  }, [accountList]);

  useEffect(() => {
    accountGraphList.length === accountList.length
      ? setAllAccounts(true)
      : setAllAccounts(false);
  }, [accountGraphList]);

  const modifyAccounts = (account) => {
    accountGraphList.includes(account)
      ? setGraphAccounts(accountGraphList.filter((acc) => acc !== account))
      : setGraphAccounts([...accountGraphList, account]);
  };

  return (
    <div>
      <label style={{ marginBottom: '0.5rem' }}>From</label>
      <ul
        className='m-0'
        style={{
          backgroundColor: 'white',
        }}
      >
        <li className='dropdown'>
          <a
            href='#'
            data-toggle='dropdown'
            className=' p-1 pr-4 form-control small-font text-decoration-none'
            style={{
              backgroundColor: 'white',
              display: 'block',
              maxHeight: '24px',
              minWidth: '120px',
            }}
          >
            {accountGraphList.length === accountList.length
              ? 'All Accounts'
              : `${accountGraphList.length} Accounts`}
          </a>

          <ul className='dropdown-menu mt-0'>
            <li>
              <div className='checkbox active small-font'>
                <label className='d-flex row-hl align-items-center pl-1'>
                  <input
                    type='checkbox'
                    checked={allAccounts}
                    onClick={() => setGraphAccounts(accountList)}
                  />
                  <span className='pl-1'>All Accounts</span>
                </label>
              </div>
            </li>
            {accountList.map((account) => (
              <li key={account._id}>
                <div className='checkbox small-font '>
                  <label className='d-flex row-hl align-items-center pl-1'>
                    <input
                      type='checkbox'
                      onClick={() => {
                        modifyAccounts(account);
                      }}
                      checked={accountGraphList.includes(account)}
                    />
                    <span className='pl-1 '>{account.accountName}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, { getAccounts, setGraphAccounts })(
  AccountsFilter
);
