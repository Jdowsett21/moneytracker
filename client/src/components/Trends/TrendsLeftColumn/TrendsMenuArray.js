export const trendsMenuArray = [
  {
    id: 1,
    listHeader: 'Spending',
    subList: [
      { title: 'Over Time', graphType: 'verticalBar' },
      { title: 'By Category', graphType: 'Donut' },
      { title: 'By Merchant', graphType: 'Donut' },
      'By Tag',
    ],
  },
  {
    id: 2,
    listHeader: 'Income',
    subList: [
      { title: 'Over Time', graphType: 'verticalBar' },
      { title: 'By Category', graphType: 'Donut' },
      { title: 'By Merchant', graphType: 'Donut' },
      'By Tag',
    ],
  },
  {
    id: 3,
    listHeader: 'Net Income',
    subList: [{ title: 'Over Time', graphType: 'combo' }],
  },
  {
    id: 4,
    listHeader: 'Assets',
    subList: [
      { title: 'Over Time', graphType: 'verticalBar' },
      { title: 'By Type', graphType: 'horizontalBar' },
      { title: 'By Account', graphType: 'horizontalBar' },
    ],
  },
  {
    id: 5,
    listHeader: 'Debts',
    subList: [
      { title: 'Over Time', graphType: 'verticalBar' },
      { title: 'By Type', graphType: 'horizontalBar' },
      { title: 'By Account', graphType: 'horizontalBar' },
    ],
  },
  {
    id: 6,
    listHeader: 'Net Worth',
    subList: [{ title: 'Over Time', graphType: 'combo' }],
  },
];
