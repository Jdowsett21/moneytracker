import React from 'react';

function MonthTable({ monthIncome, monthDebt, monthNet }) {
  return (
    <React.Fragment>
      <table className='table mb-0 text-center small-medium-font'>
        <thead>
          <tr>
            <th>Income</th>
            <th>Spent</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(monthIncome)}
            </td>
            <td>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(monthDebt)}
            </td>
            <td>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(monthNet)}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default MonthTable;
