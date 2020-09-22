import React from 'react';
import budgetImage from '../../img/Budgeting Methods_Banner.png';

function BudgetSection(props) {
  return (
    <div id='budget-section' className='logo-background pt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              src={budgetImage}
              className='img-fluid my-3 rounded-circle'
              alt=''
            />
          </div>
          <div className='col-md-6'>
            <h3>Manage Budgets</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ut
              ad asperiores optio animi quidem.
            </p>
            <div className='d-flex'>
              <div className='p-3 align-self-start'>
                <div className='fas fa-check fa-2x'></div>
              </div>
              <div className='p-3 self-align-end'>
                <div className=''>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Minima optio adipisci nam iste, libero tempore.
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='p-3 self-align-start'>
                <div className='fas fa-check fa-2x'></div>
              </div>
              <div className='p-3 self-align-end'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur hic quisquam illo consequuntur tenetur quae.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSection;
