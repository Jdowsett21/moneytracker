import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NetTotalBar from './NetTotalBar';
import {
  setCash,
  setCashPercent,
  setDebt,
  setDebtPercent,
  setTotal,
  setTotalPercent,
} from '../../../../actions/AccountActions';

function NetTotalGraph({
  accounts: {
    cash,
    debt,
    cashPercent,
    debtPercent,
    total,
    totalPercent,
    accountList,
  },
  setCash,
  setCashPercent,
  setDebt,
  setDebtPercent,
  setTotal,
  setTotalPercent,
}) {
  useEffect(() => {
    if (accountList.length !== 0) {
      setCash();
      setDebt();
      setTotal();
      setCashPercent();
      setDebtPercent();
      setTotalPercent();
    }
    //eslint-disable-next-line
  }, [accountList]);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  return (
    <React.Fragment>
      <ul className='horizontal-bar'>
        <NetTotalBar
          style={cashPercent}
          type='cash'
          text='Cash'
          value={formatMoney(cash)}
        />
        <NetTotalBar
          style={debtPercent}
          type='debt'
          text='Debt'
          value={formatMoney(debt)}
        />
        <NetTotalBar
          style={totalPercent}
          type={cash > debt ? 'cash' : 'debt'}
          text='Total'
          value={formatMoney(total)}
        />
      </ul>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  accounts: state.accounts,
});
export default connect(mapStatetoProps, {
  setCash,
  setCashPercent,
  setDebt,
  setDebtPercent,
  setTotal,
  setTotalPercent,
})(NetTotalGraph);
