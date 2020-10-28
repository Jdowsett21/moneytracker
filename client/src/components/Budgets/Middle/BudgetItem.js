import React, { useEffect, useState } from 'react';
import {
  incrementBudget,
  decrementBudget,
} from '../../../actions/BudgetActions';
import {
  preventTransactionReRendering,
  setTransactionListByCategory,
} from '../../../actions/transactionActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function BudgetItem({
  budget,
  categoryTotal,
  incrementBudget,
  decrementBudget,
  time: { date1, date2 },
  preventTransactionReRendering,
  setTransactionListByCategory,
}) {
  const [ratio, setRatio] = useState('');
  const [barColor, setBarColor] = useState('');

  //setting hover background
  const [backgroundColor, setBackgroundColor] = useState('');

  //setting hover for budget item
  const [hover, setHover] = useState(false);

  const settingHover = () => {
    setHover(true);
  };

  const removingHover = () => {
    setHover(false);
  };

  //setting left button hover for increment and decrement budget buttons
  const [leftButtonHover, setLeftButtonHover] = useState(false);

  const settingLeftButtonHover = () => {
    setLeftButtonHover(true);
  };

  const removingLeftButtonHover = () => {
    setLeftButtonHover(false);
  };

  // const [rightButtonHover, setRightButtonHover] = useState(false);

  // const settingRightButtonHover = () => {
  //   setRightButtonHover(true);
  // };

  // const removingRightButtonHover = () => {
  //   setRightButtonHover(false);
  // };

  useEffect(() => {
    setRatio(
      categoryTotal >= budget.budgetLimit
        ? 100
        : (categoryTotal / budget.budgetLimit) * 100
    );
    setBarColor(
      budget.category === 'Income' || categoryTotal / budget.budgetLimit < 0.9
        ? 'success'
        : categoryTotal >= budget.budgetLimit
        ? 'danger'
        : 'warning'
    );

    setBackgroundColor(
      budget.category === 'Income' || categoryTotal / budget.budgetLimit < 0.9
        ? '#ddf3df'
        : categoryTotal >= budget.budgetLimit
        ? '#f28179'
        : '#eff279'
    );
  }, [categoryTotal, budget]);

  const increment = () => {
    incrementBudget(budget);
  };
  const decrement = () => {
    decrementBudget(budget);
  };

  return (
    <div
      key={budget.category}
      onMouseOver={settingHover}
      onMouseLeave={removingHover}
      style={{ borderTop: '#61dafb' }}
    >
      {/* when hovered */}
      {hover && (
        <div
          className={`border border-${barColor} pt-1 mb`}
          //setting background to green if category is income
          style={{
            backgroundColor,
          }}
        >
          <div className='px-3 d-flex align-content-end'>
            <Link
              to='/transactions'
              className='mr-auto text-dark'
              onClick={() => {
                preventTransactionReRendering();
                setTransactionListByCategory(budget, date1, date2);
              }}
            >
              {budget.subCategory === '' ? (
                <strong className='small-medium-font '>{`${budget.category}`}</strong>
              ) : (
                <span className='small-medium-font '>{`${budget.category}`}</span>
              )}
              <strong className='small-medium-font'>
                {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
              </strong>
            </Link>
            <div className='d-flex pb-1'>
              {/* eslint-disable-next-line */}
              <a
                onClick={decrement}
                onMouseOver={settingLeftButtonHover}
                onMouseLeave={removingLeftButtonHover}
                className={`pr-1  rounded-circle fas fa-caret-left fa-xs  align-self-end`}
                style={{
                  backgroundColor: `${
                    leftButtonHover ? 'bg bg-secondary' : ''
                  }`,
                }}
              ></a>
              {/* //removing or adding subcategory */}
              <h2 className='small-medium-font align-self-end'>{`$${budget.budgetLimit} `}</h2>
              {/* eslint-disable-next-line */}
              <a
                onClick={increment}
                // onMouseOver={settingRightButtonHover}
                // onMouseLeave={removingRightButtonHover}
                className={`px-1 fas fa-caret-right fa-xs  align-self-end text-decoration-none`}
              ></a>
              <span className='extra-small-font align-self-end'>expected</span>
            </div>
          </div>

          <div className='progress m-1' style={{ height: '12px' }}>
            <div
              className={`progress-bar progress-bar-striped bg-${barColor}`}
              style={{ width: `${ratio}%` }}
            ></div>
          </div>
          <div className='d-flex justify-content-end px-1 pb-1'>
            {/* <a href='/#' className='small-font'>
              Edit Details
            </a> */}
            <span className='small-font i'>{`$${categoryTotal} spent this month`}</span>
          </div>
        </div>
      )}
      {/* //when not hovered */}
      {hover === false && (
        <div className='border border-white pt-1'>
          <div className='d-flex justify-content-between px-3 '>
            {/* //removing or adding subcategory */}
            <div className='mr-auto'>
              {budget.subCategory === '' ? (
                <strong className='small-medium-font '>{`${budget.category}`}</strong>
              ) : (
                <span className='small-medium-font '>{`${budget.category}`}</span>
              )}
              <strong className='small-medium-font'>
                {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
              </strong>
            </div>
            <div className='d-flex align-self-end pb-1'>
              <h2 className='small-medium-font'>{`${new Intl.NumberFormat(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                }
              ).format(categoryTotal)} of $${budget.budgetLimit}`}</h2>
            </div>
          </div>
          <div className='progress m-1' style={{ height: '12px' }}>
            <div
              className={`progress-bar progress-bar-striped bg-${barColor}`}
              style={{ width: `${ratio}%` }}
            ></div>
          </div>
          {/* specific margin set so that when bar above is hovered //bar below
          does not shift up or down */}
          <div style={{ marginBottom: '1.5rem' }}></div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  time: state.time,
});

export default connect(mapStateToProps, {
  decrementBudget,
  preventTransactionReRendering,
  setTransactionListByCategory,
  incrementBudget,
})(BudgetItem);
