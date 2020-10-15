import { SET_DATA, SET_GRAPH_TYPE } from '../actions/types';

const initialState = {
  data: [],
  graphType: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    //setting time info for each graph based on dropdown menu in trends page

    case SET_GRAPH_TYPE:
      return {
        ...state,
        graphType: action.payload,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload.data.map((transaction) => {
          return {
            x: transaction.shortDate,
            y: transaction.amount,
          };
        }),
        format: action.payload.timeInfo.format,
      };
    default:
      return state;
  }
};
