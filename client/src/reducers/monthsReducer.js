import { SET_HOVERED_MONTH, SET_MONTH } from '../actions/types';
import moment from 'moment';
const initialState = {
  hoveredMonth: moment().format('MMM'),
  month: moment().format('MMM'),
  barHeight: 0,
  barTotal: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVERED_MONTH:
      return {
        ...state,
        hoveredMonth: moment()
          .subtract(5 - action.payload, 'months')
          .format('MMM'),
      };

    case SET_MONTH:
      return {
        ...state,
        month: action.payload,
      };
    default:
      return state;
  }
};
