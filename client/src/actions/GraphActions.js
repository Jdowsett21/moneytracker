import { authAxios } from '../utils/authFetch';
import { SET_NET_OVER_TIME_DATA, SET_CATEGORY_DATA, SET_MERCHANT_DATA, SET_OVER_TIME_DATA, SET_GRAPH_TYPE } from './types';
import qs from 'qs';
export const setGraphData = (
  timeInfo,
  accounts,
  type ,
  subItem,
  tags
) => async (dispatch) => {
  if (type === 'Spending' || type === 'Income' || type === 'Net Income') {
    const { data } = await authAxios.get(
      `/transactions/graphInfo/${timeInfo.range1}/${timeInfo.range2}/${type}/${subItem}/${tags}`,
      {
        params: {
          accounts: accounts,
        }, 
      }
    );

    dispatch({
      type: subItem=== 'Over Time' && type !== 'Net Income'? SET_OVER_TIME_DATA : subItem=== 'By Merchant' ? SET_MERCHANT_DATA : subItem=== 'By Category'? SET_CATEGORY_DATA: SET_NET_OVER_TIME_DATA,
      payload: { data, timeInfo, subItem, type },
    });
  }
  // else {
  //   const { data } = await authAxios.get(
  //     `/accounts/${timeInfo}/${type}/${subItem}/${accounts}/${tags}`
  //   );

  //   dispatch({
  //     type: SET_DATA,
  //     payload: { data, timeInfo },
  //   });
  // }
};

export const setGraphType = (graphType) => {
  return {
    type: SET_GRAPH_TYPE,
    payload: graphType,
  };
};
