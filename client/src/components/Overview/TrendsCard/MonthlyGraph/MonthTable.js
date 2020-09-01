import React from 'react';

function MonthTable({ monthIncome, monthDebt, monthNet }) {
  return (
    <React.Fragment>
      <table className=' table mb-0'>
        <thead className='small-font '>
          <tr>
            <th>Income</th>
            <th>Spent</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody className='small-font '>
          <tr>
            <td>{monthIncome}</td>
            <td>{monthDebt}</td>
            <td>{monthNet}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default MonthTable;
