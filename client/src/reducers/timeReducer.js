import {
  SET_HOVERED_BUDGET_MONTH,
  SET_HOVERED_MONTH,
  SET_MONTH,
  SET_TIME_INFO,
} from '../actions/types';
import moment from 'moment';
const initialState = {
  hoveredMonth: moment().format('MMM'),
  hoveredBudgetMonth: '',
  month: moment().format('MMM'),
  date1: moment().date(1).toISOString(),
  date2: moment().date(1).add(1, 'months').subtract(1, 'days').toISOString(),
  barHeight: 0,
  barTotal: 0,
  timeInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVERED_MONTH:
      return {
        ...state,
        hoveredMonth: moment()
          .subtract(5 - action.payload, 'months')
          .format('MMM'),
        date1: moment()
          .date(1)
          .subtract(5 - action.payload, 'months')
          .toISOString(),
        date2: moment()
          .date(1)
          .subtract(4 - action.payload, 'months')
          .subtract(1, 'days')
          .toISOString(),
      };
    //adding the ternary function for '' allows us to reset month to ''
    //every time we are not hovered
    case SET_HOVERED_BUDGET_MONTH:
      return {
        ...state,
        hoveredBudgetMonth:
          action.payload === ''
            ? ''
            : moment()
                .subtract(11 - action.payload, 'months')
                .format('MMM'),
        date1:
          action.payload === ''
            ? ''
            : moment()
                .date(1)
                .subtract(11 - action.payload, 'months')
                .toISOString(),
        date2:
          action.payload === ''
            ? ''
            : moment()
                .date(1)
                .subtract(10 - action.payload, 'months')
                .subtract(1, 'days')
                .toISOString(),
      };
    case SET_MONTH:
      return {
        ...state,
        month: action.payload.label,
        date1: action.payload.dataFilter1,
        date2: action.payload.dataFilter2,
      };

    //setting date for dateformatter on top of trends filter bar
    case SET_TIME_INFO:
      return {
        ...state,
        timeInfo: action.payload,
      };

    default:
      return state;
  }
};
