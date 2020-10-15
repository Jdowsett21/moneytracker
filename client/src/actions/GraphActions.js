import { authAxios } from '../utils/authFetch';
import { SET_DATA, SET_GRAPH_TYPE } from './types';

export const setGraphData = (
  timeInfo,
  accounts,
  type = 'Spending',
  subItem = 'Over Time',
  tags
) => async (dispatch) => {
  if (type === 'Spending' || type === 'Income' || type === 'Net Income') {
    console.log(accounts);
    const { data } = await authAxios.get(
      `/transactions/graphInfo/${timeInfo.range1}/${timeInfo.range2}/${type}/${subItem}/${accounts}/${tags}`
    );

    dispatch({
      type: SET_DATA,
      payload: { data, timeInfo },
    });
  }
  // else {
  //   const { data } = await authAxios.get(
  //     `/accounts/${timeInfo}/${type}/${subType}/${accounts}/${tags}`
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
