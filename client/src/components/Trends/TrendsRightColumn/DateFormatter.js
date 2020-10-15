import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
function DateFormatter({ time: { timeInfo } }) {
  return (
    <small>
      {/* date format changes and shows day for certain filters */}
      {/* the below items want to show the day */}
      {timeInfo.label === 'Last 7 days' ||
      timeInfo.label === 'Last 14 days' ||
      timeInfo.label === 'This month' ||
      timeInfo.label === 'Last month'
        ? `From  ${moment(timeInfo.range1).format('MMMM')} ${moment(
            timeInfo.range1
          ).format('DD')}, ${moment(timeInfo.range1).format(
            'YYYY'
          )} to ${moment(timeInfo.range2).format('MMMM')}  ${moment(
            timeInfo.range2
          ).format('DD')}, ${moment(timeInfo.range2).format('YYYY')}`
        : `From  ${moment(timeInfo.range1).format('MMMM')} ${moment(
            timeInfo.range1
          ).format('YYYY')} to ${moment(timeInfo.range2).format(
            'MMMM'
          )} ${moment(timeInfo.range2).format('YYYY')}`}
    </small>
  );
}

const mapStateToProps = (state) => ({
  time: state.time,
});

export default connect(mapStateToProps)(DateFormatter);
