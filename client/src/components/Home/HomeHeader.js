import React from 'react';

function HomeHeader(props) {
  return (
    <header id='home-section'>
      <div className='home-inner container'>
        <div className='row'>
          <div className='col-lg-8 text-white'>
            <div className='dark-overlay'>
              <h1 className='display-4'>
                Master
                <strong> your finances </strong>
                and manage your <strong>budgets</strong>
              </h1>
            </div>
            <div className='d-none d-md-block'>
              <div className='d-flex'>
                <div className='p-4 align-self-start'>
                  <i className='fas fa-check fa-2x'></i>
                </div>
                <div className='p4 align-self-end'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque ducimus, laboriosam illo cumque dolorum aspernatur
                  doloribus voluptatem voluptate, magni illum dignissimos odio
                </div>
              </div>

              <div className='d-flex'>
                <div className='p-4 align-self-start'>
                  <i className='fas fa-check fa-2x'></i>
                </div>
                <div className='p4 align-self-end'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque ducimus, laboriosam illo cumque dolorum aspernatur
                  doloribus voluptatem voluptate, magni illum dignissimos odio
                </div>
              </div>
              <div className='d-flex'>
                <div className='p-4 align-self-start'>
                  <i className='fas fa-check fa-2x'></i>
                </div>
                <div className='p4 align-self-end'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque ducimus, laboriosam illo cumque dolorum aspernatur
                  doloribus voluptatem voluptate, magni illum dignissimos odio
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
