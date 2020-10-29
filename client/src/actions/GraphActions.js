import { authAxios } from '../utils/authFetch';
import {
  SET_NET_OVER_TIME_DATA,
  SET_CATEGORY_DATA,
  SET_MERCHANT_DATA,
  SET_OVER_TIME_DATA,
  SET_GRAPH_TYPE,
  SET_MONTH_DAILY_DATA,
} from './types';
import moment from 'moment';
export const setGraphData = (timeInfo, accounts, type, subItem, tags) => async (
  dispatch
) => {
  if (type === 'Spending' || type === 'Income' || type === 'Net Income') {
    const { data } = await authAxios.get(
      `/transactions/graphInfo/${timeInfo.range1}/${timeInfo.range2}/${type}/${subItem}/${tags}`,
      {
        params: {
          accounts: accounts,
        },
      }
    );
    console.log(
      Math.ceil(
        (moment(data[0].shortDate) - moment(data[data.length - 1].shortDate)) /
          86400000 /
          30
      )
    );

    dispatch({
      type:
        subItem === 'Over Time' && type !== 'Net Income'
          ? SET_OVER_TIME_DATA
          : subItem === 'By Merchant'
          ? SET_MERCHANT_DATA
          : subItem === 'By Category'
          ? SET_CATEGORY_DATA
          : SET_NET_OVER_TIME_DATA,
      payload: { data, timeInfo, subItem, type },
    });
  }
};

export const setOverviewGraph = () => async (dispatch) => {
  const timeInfo = {
    range1: moment()
      .subtract(moment().date() - 1, 'days')
      .subtract(1, 'months')
      .startOf('day')
      .toISOString(),
    range2: moment().endOf('day').toISOString(),
  };
  const { data } = await authAxios.get(
    `/transactions/overviewGraph/${timeInfo.range1}/${timeInfo.range2}/Withdrawal`
  );

  dispatch({
    type: SET_MONTH_DAILY_DATA,
    payload: { data, timeInfo },
  });
};
export const setGraphType = (graphType) => {
  return {
    type: SET_GRAPH_TYPE,
    payload: graphType,
  };
};
