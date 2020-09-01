import React, { useState, useEffect } from 'react';
import AccountItem from './AccountItem';
import { connect } from 'react-redux';
import AccountCardHeader from './AccountTitle';

function AccountsList({ accountCategory, accountList }) {
  const [filteredAccounts, setFilterAccount] = useState([]);
  const [open] = useState('down');

  useEffect(() => {
    setFilterAccount(
      accountList &&
        accountList.filter((account) => {
          return accountCategory === account.accountCategory;
        })
    );
  }, [accountList, accountCategory]);
  return (
    <div className='container'>
      <div data-toggle='collapse' data-target={`#${accountCategory}`}>
        <AccountCardHeader accountCategory={accountCategory} open={open} />
      </div>
      <ul id={accountCategory} className='collapse show  list-group '>
        {filteredAccounts.map((account) => (
          <AccountItem key={account.accountName} account={account} />
        ))}
      </ul>
    </div>
  );
}
const mapStatetoProps = (state) => ({
  accountList: state.accounts.accountList,
});
export default connect(mapStatetoProps)(AccountsList);
