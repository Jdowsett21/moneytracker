import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setClick } from '../../../actions/ClickAction';
import { setGraphData, setGraphType } from './../../../actions/GraphActions';
function MenuSubItems({
  subItem,
  item,
  clickable: { clickStatus },
  setClick,
  setGraphData,
  setGraphType,
  time: { timeInfo },
  accounts: { accountGraphList },
}) {
  const [hover, setHover] = useState('');

  // useEffect(() => {
  //   setGraphData(timeInfo, accountGraphList, item, subItem.title);
  // }, [timeInfo, accountGraphList, item, subItem.title]);
  return (
    <li
      key={subItem.title}
      className={`list-group-subItem.title small-font bg-${
        clickStatus === `${item.listHeader}${subItem.title}`
          ? 'success'
          : 'white'
      } p-1`}
      onClick={() => {
        setClick(`${item.listHeader}${subItem.title}`);
        setGraphData(
          timeInfo,
          accountGraphList,
          item.listHeader,
          subItem.title
        );
        setGraphType(subItem.graphType);
      }}
      onMouseEnter={() => setHover(`${item.listHeader}${subItem.title}`)}
      onMouseLeave={() => setHover('')}
    >
      {/* eslint-disable-next-line */}
      <a
        className={`text text-${
          clickStatus === `${item.listHeader}${subItem.title}`
            ? 'white'
            : hover === `${item.listHeader}${subItem.title}`
            ? 'success'
            : 'dark'
        } text-decoration-none`}
      >
        {subItem.title}
      </a>
    </li>
  );
}

const mapStatetoProps = (state) => ({
  clickable: state.clickable,
  time: state.time,
  accounts: state.accounts,
});
export default connect(mapStatetoProps, {
  setClick,
  setGraphData,
  setGraphType,
})(MenuSubItems);
