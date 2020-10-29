import {
  SET_NET_OVER_TIME_DATA,
  SET_CATEGORY_DATA,
  SET_MERCHANT_DATA,
  SET_OVER_TIME_DATA,
  SET_GRAPH_TYPE,
  SET_MONTH_DAILY_DATA,
} from '../actions/types';
import moment from 'moment';
const initialState = {
  data: [],
  data1: [],
  data2: [],
  data3: [],
  data4: [],
  graphType: '',
  length: '',
  category: '',
  subCategory: '',
  timeInfo: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    //setting time info for each graph based on dropdown menu in trends page

    case SET_GRAPH_TYPE:
      return {
        ...state,
        graphType: action.payload,
      };
    //use amount value to get real value of transactions
    case SET_NET_OVER_TIME_DATA:
      const { timeInfo, data, type, subItem } = action.payload;

      return {
        ...state,
        data:
          timeInfo.label === 'All time'
            ? [
                ...Array(
                  Math.ceil(
                    (moment(data[0].shortDate) -
                      moment(data[data.length - 1].shortDate)) /
                      86400000 /
                      30
                  )
                ),
              ].map((item, index) => {
                return {
                  x: new Date(
                    moment()
                      .date(1)
                      .subtract(moment().date(), 'days')
                      .subtract(
                        Math.ceil(
                          (moment(data[0].shortDate) -
                            moment(data[data.length - 1].shortDate)) /
                            86400000 /
                            30
                        ) -
                          index -
                          2,
                        timeInfo.unit
                      )
                  ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      moment()
                        .subtract(
                          Math.ceil(
                            (moment(data[0].shortDate) -
                              moment(data[data.length - 1].shortDate)) /
                              86400000 /
                              30
                          ) -
                            index -
                            2,
                          timeInfo.unit
                        )
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Deposit'
                    ) {
                      return transaction.amountValue + acc;
                    }
                    return acc;
                  }, 0),
                };
              })
            : [...Array(timeInfo.length)].map((item, index) => {
                return {
                  x:
                    timeInfo.label === 'Last month'
                      ? new Date(
                          moment()
                            .subtract(moment().date(), 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : timeInfo.label === 'Last year'
                      ? new Date(
                          moment()
                            .date(1)
                            .subtract(1, 'years')
                            .month(timeInfo.length - index - 1)
                        )
                      : timeInfo.unit === 'months'
                      ? new Date(
                          moment()
                            .date(1, 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : new Date(
                          moment().subtract(
                            timeInfo.length - index - 1,
                            timeInfo.unit
                          )
                        ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      timeInfo.label === 'Last year' &&
                      moment()
                        .subtract(1, 'years')
                        .month(timeInfo.length - index - 1)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Deposit'
                    ) {
                      return transaction.amountValue + acc;
                    } else if (
                      timeInfo.label === 'Last month' &&
                      moment()
                        .subtract(moment().date(), 'days')
                        .subtract(timeInfo.length - index - 1, timeInfo.unit)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Deposit'
                    ) {
                      return transaction.amountValue + acc;
                    } else {
                      if (
                        moment()
                          .subtract(timeInfo.length - index - 1, timeInfo.unit)
                          .format(timeInfo.format) ===
                          moment(transaction.shortDate).format(
                            timeInfo.format
                          ) &&
                        transaction.paymentType === 'Deposit'
                      ) {
                        return transaction.amountValue + acc;
                      }
                    }
                    return acc;
                  }, 0),
                };
              }),
        data1:
          timeInfo.label === 'All time'
            ? [
                ...Array(
                  Math.ceil(
                    (moment(data[0].shortDate) -
                      moment(data[data.length - 1].shortDate)) /
                      86400000 /
                      30
                  )
                ),
              ].map((item, index) => {
                return {
                  x: new Date(
                    moment()
                      .date(1)
                      .subtract(moment().date(), 'days')
                      .subtract(
                        Math.ceil(
                          (moment(data[0].shortDate) -
                            moment(data[data.length - 1].shortDate)) /
                            86400000 /
                            30
                        ) -
                          index -
                          2,
                        timeInfo.unit
                      )
                  ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      moment()
                        .date(1)
                        .subtract(
                          Math.ceil(
                            (moment(data[0].shortDate) -
                              moment(data[data.length - 1].shortDate)) /
                              86400000 /
                              30
                          ) -
                            index -
                            2,
                          timeInfo.unit
                        )
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Withdrawal'
                    ) {
                      return transaction.amountValue + acc;
                    }
                    return acc;
                  }, 0),
                };
              })
            : [...Array(timeInfo.length)].map((item, index) => {
                return {
                  x:
                    timeInfo.label === 'Last month'
                      ? new Date(
                          moment()
                            .subtract(moment().date(), 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : timeInfo.label === 'Last year'
                      ? new Date(
                          moment()
                            .date(1)
                            .subtract(1, 'years')
                            .month(timeInfo.length - index - 1)
                        )
                      : timeInfo.unit === 'months'
                      ? new Date(
                          moment()
                            .date(1, 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : new Date(
                          moment().subtract(
                            timeInfo.length - index - 1,
                            timeInfo.unit
                          )
                        ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      timeInfo.label === 'Last year' &&
                      moment()
                        .subtract(1, 'years')
                        .month(timeInfo.length - index - 1)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Withdrawal'
                    ) {
                      return transaction.amountValue + acc;
                    } else if (
                      timeInfo.label === 'Last month' &&
                      moment()
                        .subtract(moment().date(), 'days')
                        .subtract(timeInfo.length - index - 1, timeInfo.unit)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format) &&
                      transaction.paymentType === 'Withdrawal'
                    ) {
                      return transaction.amountValue + acc;
                    } else {
                      if (
                        moment()
                          .subtract(timeInfo.length - index - 1, timeInfo.unit)
                          .format(timeInfo.format) ===
                          moment(transaction.shortDate).format(
                            timeInfo.format
                          ) &&
                        transaction.paymentType === 'Withdrawal'
                      ) {
                        return transaction.amountValue + acc;
                      }
                    }
                    return acc;
                  }, 0),
                };
              }),
        data2:
          timeInfo.label === 'All time'
            ? [
                ...Array(
                  Math.ceil(
                    (moment(data[0].shortDate) -
                      moment(data[data.length - 1].shortDate)) /
                      86400000 /
                      30
                  )
                ),
              ].map((item, index) => {
                return {
                  x: new Date(
                    moment()
                      .date(1)
                      .subtract(moment().date(), 'days')
                      .subtract(
                        Math.ceil(
                          (moment(data[0].shortDate) -
                            moment(data[data.length - 1].shortDate)) /
                            86400000 /
                            30
                        ) -
                          index -
                          2,
                        timeInfo.unit
                      )
                  ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      moment()
                        .subtract(
                          Math.ceil(
                            (moment(data[0].shortDate) -
                              moment(data[data.length - 1].shortDate)) /
                              86400000 /
                              30
                          ) -
                            index -
                            2,
                          timeInfo.unit
                        )
                        .format(timeInfo.format) ===
                      moment(transaction.shortDate).format(timeInfo.format)
                    ) {
                      return transaction.amountValue + acc;
                    }
                    return acc;
                  }, 0),
                };
              })
            : [...Array(timeInfo.length)].map((item, index) => {
                return {
                  x:
                    timeInfo.label === 'Last month'
                      ? new Date(
                          moment()
                            .subtract(moment().date(), 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : timeInfo.label === 'Last year'
                      ? new Date(
                          moment()
                            .date(1)
                            .subtract(1, 'years')
                            .month(timeInfo.length - index - 1)
                        )
                      : timeInfo.unit === 'months'
                      ? new Date(
                          moment()
                            .date(1, 'days')
                            .subtract(
                              timeInfo.length - index - 1,
                              timeInfo.unit
                            )
                        )
                      : new Date(
                          moment().subtract(
                            timeInfo.length - index - 1,
                            timeInfo.unit
                          )
                        ),
                  y: data.reduce((acc, transaction) => {
                    if (
                      timeInfo.label === 'Last year' &&
                      moment()
                        .date(1)
                        .subtract(1, 'years')
                        .month(timeInfo.length - index - 1)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format)
                    ) {
                      return transaction.amountValue + acc;
                    } else if (
                      timeInfo.label === 'Last month' &&
                      moment()
                        .subtract(moment().date(), 'days')
                        .subtract(timeInfo.length - index - 1, timeInfo.unit)
                        .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format)
                    ) {
                      return transaction.amountValue + acc;
                    } else {
                      if (
                        moment()
                          .subtract(timeInfo.length - index - 1, timeInfo.unit)
                          .format(timeInfo.format) ===
                        moment(transaction.shortDate).format(timeInfo.format)
                      ) {
                        return transaction.amountValue + acc;
                      }
                    }
                    return acc;
                  }, 0),
                };
              }),

        category: type,
        subCategory: subItem,
        length: timeInfo.length,
        unit: timeInfo.unit,
      };
    case SET_CATEGORY_DATA:
      return {
        ...state,
        data: [
          ...new Set(action.payload.data.map((item) => item.subCategory)),
        ].map((subCat) => {
          return {
            label: subCat,
            y: (
              (action.payload.data.reduce((acc, transaction) => {
                if (subCat === transaction.subCategory) {
                  return transaction.amount + acc;
                }
                return acc;
              }, 0) /
                action.payload.data.reduce(
                  (acc, transaction) => transaction.amount + acc,
                  0
                )) *
              100
            ).toFixed(2),
          };
        }),
        category: action.payload.type,
        subCategory: action.payload.subItem,
        length: action.payload.timeInfo.length,
      };
    case SET_MERCHANT_DATA:
      return {
        ...state,
        data: [
          ...new Set(action.payload.data.map((item) => item.description)),
        ].map((description, index) => {
          return {
            label: description,
            y: (
              (action.payload.data.reduce((acc, transaction) => {
                if (description === transaction.description) {
                  return transaction.amount + acc;
                }
                return acc;
              }, 0) /
                action.payload.data.reduce(
                  (acc, transaction) => transaction.amount + acc,
                  0
                )) *
              100
            ).toFixed(2),
          };
        }),
        category: action.payload.type,
        subCategory: action.payload.subItem,
        length: action.payload.timeInfo.length,
      };

    case SET_MONTH_DAILY_DATA:
      return {
        ...state,
        //previous month
        data3: [...Array(moment().subtract(1, 'months').daysInMonth())].map(
          (item, index) => {
            return {
              x: Number(
                moment()
                  .subtract(moment().date(), 'days')
                  .subtract(
                    moment().subtract(1, 'months').daysInMonth() - index - 1,
                    'days'
                  )
                  .format('DD')
              ),
              y: action.payload.data.reduce((acc, trans) => {
                if (
                  moment()
                    .subtract(moment().date(), 'days')
                    .subtract(
                      moment().subtract(1, 'months').daysInMonth() - index - 1,
                      'days'
                    )
                    .isSameOrAfter(moment(trans.shortDate)) &&
                  moment(trans.shortDate).isBefore(moment().date(1))
                ) {
                  return trans.amount + acc;
                }
                return acc;
              }, 0),
            };
          }
        ),
        //currentMonth
        data4: [...Array(Number(moment().format('DD')))].map((item, index) => {
          return {
            x: moment()
              .subtract(Number(moment().format('DD')) - index - 1, 'days')
              .format('DD'),
            y: action.payload.data.reduce((acc, trans) => {
              if (
                moment()
                  .subtract(Number(moment().format('DD')) - index - 1, 'days')
                  .format('MMM-DD-YYYY') >=
                  moment(trans.shortDate).format('MMM-DD-YYYY') &&
                moment(trans.shortDate).format('MMM-DD-YYYY') >=
                  moment().date(1).format('MMM-DD-YYYY')
              ) {
                return trans.amount + acc;
              }
              return acc;
            }, 0),

            // indexLabel:
            //   Number(moment().format('DD') - 1) === index ? 'Spent: {y}' : '',
          };
        }),
      };
    case SET_OVER_TIME_DATA:
      return {
        ...state,
        data:
          action.payload.timeInfo.label === 'All time'
            ? [
                ...Array(
                  Math.ceil(
                    (moment(action.payload.data[0].shortDate) -
                      moment(
                        action.payload.data[action.payload.data.length - 1]
                          .shortDate
                      )) /
                      86400000 /
                      30
                  )
                ),
              ].map((item, index) => {
                return {
                  x: new Date(
                    moment()
                      .date(1)
                      .subtract(moment().date(), 'days')
                      .subtract(
                        Math.ceil(
                          (moment(action.payload.data[0].shortDate) -
                            moment(
                              action.payload.data[
                                action.payload.data.length - 1
                              ].shortDate
                            )) /
                            86400000 /
                            30
                        ) -
                          index -
                          2,
                        action.payload.timeInfo.unit
                      )
                  ),
                  y: action.payload.data.reduce((acc, transaction) => {
                    if (
                      moment()
                        .date(1)
                        .subtract(
                          Math.ceil(
                            (moment(action.payload.data[0].shortDate) -
                              moment(
                                action.payload.data[
                                  action.payload.data.length - 1
                                ].shortDate
                              )) /
                              86400000 /
                              30
                          ) -
                            index -
                            2,
                          action.payload.timeInfo.unit
                        )
                        .format(action.payload.timeInfo.format) ===
                      moment(transaction.shortDate).format(
                        action.payload.timeInfo.format
                      )
                    ) {
                      return transaction.amount + acc;
                    }
                    return acc;
                  }, 0),
                };
              })
            : [...Array(action.payload.timeInfo.length)].map((item, index) => {
                return {
                  x:
                    action.payload.timeInfo.label === 'Last year'
                      ? new Date(
                          moment()
                            .date(1)
                            .subtract(1, 'years')
                            .month(timeInfo.length - index - 1)
                        )
                      : action.payload.timeInfo.unit === 'months'
                      ? new Date(
                          moment()
                            .date(1, 'days')
                            .subtract(
                              action.payload.timeInfo.length - index - 1,
                              action.payload.timeInfo.unit
                            )
                        )
                      : new Date(
                          moment().subtract(
                            action.payload.timeInfo.length - index - 1,
                            action.payload.timeInfo.unit
                          )
                        ),
                  y: action.payload.data.reduce((acc, transaction) => {
                    // timeInfo.label ==='Last Year'?:
                    // if (
                    //   mt
                    //     .date(1)
                    //     .subtract(1, 'years')
                    //     .month(timeInfo.length - index - 1) ===
                    //   moment(transaction.shortDate).format(
                    //     action.payload.timeInfo.format
                    //   )
                    // )
                    if (
                      moment()
                        .subtract(
                          action.payload.timeInfo.length - index - 1,
                          action.payload.timeInfo.unit
                        )
                        .format(action.payload.timeInfo.format) ===
                      moment(transaction.shortDate).format(
                        action.payload.timeInfo.format
                      )
                    ) {
                      return action.payload.category === 'Spending'
                        ? transaction.amount * -1 + acc
                        : transaction.amount + acc;
                    }
                    return acc;
                  }, 0),
                };
              }),
        category: action.payload.type,
        subCategory: action.payload.subItem,
        length: action.payload.timeInfo.length,
        unit: action.payload.timeInfo.unit,
      };
    default:
      return state;
  }
};
