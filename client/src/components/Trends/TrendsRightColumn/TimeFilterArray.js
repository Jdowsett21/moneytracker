import moment from 'moment';

const today = moment().toISOString();

export const timeFilterArray = [
  {
    range1: moment().subtract(7, 'days').toISOString(),
    range2: today,
    length: 7,
    unit: 'days',
    format: 'MMM-DD-YYYY',
    label: 'Last 7 days',
  },
  {
    range1: moment().subtract(13, 'days').toISOString(),
    range2: today,
    length: 14,
    unit: 'days',
    format: 'MMM-DD-YYYY',
    label: 'Last 14 days',
  },
  {
    range1: moment().date(1).toISOString(),
    range2: today,
    length: (moment() - moment().date(1).subtract(1, 'days')) / 86400000,
    unit: 'days',
    format: 'MMM-DD-YYYY',
    label: 'This month',
  },
  {
    range1: moment()
      .subtract(moment().date() - 1, 'days')
      .subtract(1, 'months')
      .toISOString(),
    range2: moment()
      .subtract(moment().date() + 1, 'days')
      .toISOString(),
    length:
      (moment().date(1) - moment().date(1).subtract(1, 'months')) / 86400000,
    unit: 'days',
    format: 'MMM-DD-YYYY',
    label: 'Last month',
  },
  {
    range1: moment().date(1).subtract(2, 'months').toISOString(),
    range2: today,
    length: 3,
    unit: 'months',
    format: 'MMM-YYYY',
    label: 'Last 3 months',
  },
  {
    range1: moment().date(1).subtract(5, 'months').toISOString(),
    range2: today,
    length: 6,
    unit: 'months',
    format: 'MMM-YYYY',
    label: 'Last 6 months',
  },
  {
    range1: moment().date(1).subtract(11, 'months').toISOString(),
    range2: today,
    length: 12,
    unit: 'months',
    format: 'MMM-YYYY',
    label: 'Last 12 months',
  },
  {
    range1: moment().month(0).date(1).toISOString(),
    range2: today,
    length: moment().month() + 1,
    unit: 'months',
    format: 'MMM-YYYY',
    label: 'This year',
  },
  {
    range1: moment().month(0).date(1).subtract(1, 'years').toISOString(),
    range2: moment().month(11).date(31).subtract(1, 'years').toISOString(),
    length: 12,
    unit: 'months',
    format: 'MM-YYYY',
    label: 'Last year',
  },
  {
    range1: moment().subtract(50, 'years').toISOString(),
    range2: moment().toISOString(),
    // length:
    unit: 'months',
    format: 'MMM-YYYY',

    label: 'All time',
  },
];
