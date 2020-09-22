import React, { useEffect, useState } from 'react';
import {
  incrementBudget,
  decrementBudget,
} from '../../../actions/BudgetActions';
import { connect } from 'react-redux';
function BudgetItem({
  budget,
  categoryTotal,
  incrementBudget,
  decrementBudget,
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

  const [rightButtonHover, setRightButtonHover] = useState(false);

  const settingRightButtonHover = () => {
    setRightButtonHover(true);
  };

  const removingRightButtonHover = () => {
    setRightButtonHover(false);
  };

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
            <div className='mr-auto'>
              <strong className='medium-font-dark '>
                {`${budget.category}`}
              </strong>
              <span className='medium-font-dark'>
                {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
              </span>
            </div>
            <div className='d-flex pb-1'>
              <a
                onClick={decrement}
                onMouseOver={settingLeftButtonHover}
                onMouseLeave={removingLeftButtonHover}
                className={`pr-1 fas fa-caret-left fa-xs rounded-circle align-self-end`}
                style={{
                  backgroundColor: `${
                    leftButtonHover ? 'bg bg-secondary' : ''
                  }`,
                }}
              ></a>
              {/* //removing or adding subcategory */}
              <h2 className='medium-font-dark align-self-end'>{`$${budget.budgetLimit} `}</h2>
              <a
                onClick={increment}
                onMouseOver={settingRightButtonHover}
                onMouseLeave={removingRightButtonHover}
                className={`px-1 fas fa-caret-right fa-xs align-self-end`}
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
          <div className='d-flex justify-content-between px-1 pb-1'>
            <a className='small-font'>Edit Details</a>
            <span className='small-font '>{`$${categoryTotal} spent this month`}</span>
          </div>
        </div>
      )}
      {/* //when not hovered */}
      {hover === false && (
        <div className='border border-white pt-1'>
          <div className='d-flex justify-content-between px-3 '>
            {/* //removing or adding subcategory */}
            <div className='mr-auto'>
              <strong className='medium-font-dark '>
                {`${budget.category}`}
              </strong>
              <span className='medium-font-dark'>
                {budget.subCategory === '' ? '' : `: ${budget.subCategory}`}
              </span>
            </div>
            <div className='d-flex align-self-end pb-1'>
              <h2 className='medium-font-dark'>{`$${categoryTotal} of $${budget.budgetLimit}`}</h2>
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

export default connect(null, {
  decrementBudget,
  incrementBudget,
})(BudgetItem);
