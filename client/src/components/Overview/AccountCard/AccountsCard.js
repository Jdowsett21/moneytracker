import React, { useEffect } from 'react';
import AccountsList from '../AccountCard/AccountsList';
import { connect } from 'react-redux';
import {
  filterAccountTypes,
  getAccounts,
} from '../../../actions/AccountActions';
import Card from '../../common/Card';
import CardHeader from '../../common/CardHeader';
import CardBody from '../../common/CardBody';
import OverviewCardHeader from '../OverviewCardHeader';

function AccountsCard({
  accounts: { accountList, accountCategories },
  filterAccountTypes,
  getAccounts,
}) {
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  useEffect(() => {
    if (accountList.length !== 0) {
      filterAccountTypes();
    }
  }, [accountList, filterAccountTypes]);

  return (
    <Card classSpecifics='m-2'>
      <CardHeader>
        <OverviewCardHeader title='Accounts' />
      </CardHeader>
      <CardBody>
        {accountCategories &&
          accountCategories.map((account) => (
            <AccountsList key={account} accountCategory={account} />
          ))}
      </CardBody>
    </Card>
  );
}

const mapStatetoProps = (state) => ({
  accounts: state.accounts,
});

export default connect(mapStatetoProps, { filterAccountTypes, getAccounts })(
  AccountsCard
);
