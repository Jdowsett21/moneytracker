import React from 'react';

function AnalyzeSection(props) {
  return (
    <section id='summary-section' className='py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card home-cards text-center shadow-lg p-4 h-100'>
              <div className='card-header h-50'>
                <i className='fas fa-funnel-dollar fa-2x pb-3'></i>
                <h5>All Your Finances Together</h5>
              </div>
              <div className='card-body'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  et?
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card home-cards text-center shadow-lg p-4 h-100'>
              <div className='card-header h-50'>
                <i className='fas fa-wallet fa-2x pb-3'></i>
                <h5>Monitor All Expenses</h5>
              </div>
              <div className='card-body'>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, id!
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            {' '}
            <div className='card home-cards text-center shadow-lg p-4 h-100'>
              <div className='card-header h-50'>
                <i className='fas fa-piggy-bank fa-2x pb-3'></i>
                <h5>Budget Everything</h5>
              </div>
              <div className='card-body'>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, id!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyzeSection;
