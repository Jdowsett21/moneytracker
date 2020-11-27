import {
  SET_HOVERED_BUDGET_MONTH,
  SET_HOVERED_MONTH,
  SET_MONTH,
  SET_TIME_INFO,
} from '../actions/types';
import moment from 'moment';
const initialState = {
  hoveredMonth: moment('2020-10-31').format('MMM'),

  // dynamic solution
  // moment().format('MMM'),
  hoveredBudgetMonth: '',
  month: moment('2020-10-31').format('MMM'),
  // dynamic solution
  // moment().format('MMM'),
  date1: moment().date(1).month(9).startOf('day').toISOString(),
  date2: moment().date(1).month(10).startOf('day').toISOString(),
  barHeight: 0,
  barTotal: 0,
  timeInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVERED_MONTH:
      return {
        ...state,
        hoveredMonth:
          // dynamic solution
          // moment()
          // .subtract(5 - action.payload, 'months')
          // .format('MMM'),
          //static solution
          moment('2020-10-31')
            .subtract(5 - action.payload, 'months')
            .format('MMM'),
        date1:
          // dynamic solution
          // moment()
          // .date(1)
          // .subtract(5 - action.payload, 'months')
          // .startOf('day')
          // .toISOString(0),

          // static solution
          moment('2020-10-31')
            .date(1)
            .subtract(5 - action.payload, 'months')
            .startOf('day')
            .toISOString(0),

        date2:
          // dynamic solution
          // moment()
          // .date(1)
          // .subtract(4 - action.payload, 'months')
          // .startOf('day')
          // .toISOString(0),

          // static solution
          moment('2020-10-31')
            .date(1)
            .subtract(4 - action.payload, 'months')
            .startOf('day')
            .toISOString(0),
      };
    //adding the ternary function for '' allows us to reset month to ''
    //every time we are not hovered
    case SET_HOVERED_BUDGET_MONTH:
      return {
        ...state,
        hoveredBudgetMonth:
          action.payload === ''
            ? ''
            : moment('2020-10-31')
                .subtract(11 - action.payload, 'months')
                .format('MMM'),

        // dynamic solution
        // moment()
        //     .subtract(11 - action.payload, 'months')
        //     .format('MMM'),
        date1:
          action.payload === ''
            ? ''
            : moment('2020-10-31')
                .date(1)
                .subtract(11 - action.payload, 'months')
                .startOf('day')
                .toISOString(),

        // dynamic solution
        //  moment()
        //     .date(1)
        //     .subtract(11 - action.payload, 'months')
        //     .startOf('day')
        //     .toISOString(),
        date2:
          action.payload === ''
            ? ''
            : moment('2020-10-31')
                .date(1)
                .subtract(10 - action.payload, 'months')
                .startOf('day')
                .toISOString(),

        // dynamic solution
        // moment()
        //     .date(1)
        //     .subtract(10 - action.payload, 'months')
        //     .startOf('day')
        //     .toISOString(),
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
