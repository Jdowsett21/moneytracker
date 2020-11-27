import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setHoveredMonth } from '../../../../actions/timeActions';
import { useHover } from '../../../../utils/useHover';
import moment from 'moment';
function MonthItem({
  type,
  index,
  month,
  setHoveredMonth,
  monthNet,
  sixMonthMax,
}) {
  const [hoverRef, isHovered] = useHover();
  useEffect(() => {
    isHovered ? setHoveredMonth(index) : moment('2020-10-31').format('MMM');
    //eslint-disable-next-line
  }, [isHovered, index]);

  return (
    <li className={type} ref={hoverRef}>
      <label className='text-extra-small text-muted'>{month.label}</label>
      {/* eslint-disable-next-line */}
      <a
        className={monthNet > 0 ? '' : 'negative'}
        href='/#'
        style={{
          height: `${
            monthNet === sixMonthMax || monthNet === sixMonthMax * -1
              ? 50
              : (monthNet < 0 && sixMonthMax > 0) ||
                (monthNet > 0 && sixMonthMax < 0)
              ? (monthNet / sixMonthMax) * 50 * -1
              : (monthNet / sixMonthMax) * 50
          }%`,

          top: `${
            monthNet < 0
              ? 50
              : monthNet > 0 && sixMonthMax < 0
              ? 50 - (monthNet / sixMonthMax) * 50 * -1
              : 50 - (monthNet / sixMonthMax) * 50
          }%`,
        }}
      ></a>
    </li>
  );
}

export default connect(null, {
  setHoveredMonth,
})(MonthItem);
