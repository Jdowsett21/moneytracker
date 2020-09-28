import React from 'react';
import AccountsCard from './AccountCard/AccountsCard';
// import InsightsCard from './OtherCards/InsightsCard';
import TrendsCard from './TrendsCard/TrendsCard';
// import FeedbackCard from './OtherCards/FeedbackCard';

function OverviewLeftColumn(props) {
  return (
    <React.Fragment>
      <div className='col-lg-4 p-3'>
        <AccountsCard />
        {/* <InsightsCard /> */}
        <TrendsCard />
        {/* <FeedbackCard /> */}
      </div>
    </React.Fragment>
  );
}

export default OverviewLeftColumn;
