import React from 'react';
import Card from '../../common/Card';
import CardBody from '../../common/CardBody';
import { trendsMenuArray } from './TrendsMenuArray';
import MenuSections from './MenuSections';

function GraphMenu() {
  return (
    <Card classSpecifics='m-0  border-0'>
      <div
        className='card-header small-font pb-3 text-dark m-0'
        style={{ borderRadius: '0rem' }}
      >
        <i className='fas fa-chart-pie pr-2'></i>
        Graphs
      </div>
      <CardBody classSpecifics='p-0 '>
        <ul
          className='list-group  m-0 pl-4'
          style={{ fontSize: '.9rem', borderRadius: '0rem' }}
        >
          {/* need items to equal item and index because they have
          the same names */}
          {trendsMenuArray.map((item, index) => (
            <MenuSections item={item} key={index} index={index} />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

export default GraphMenu;
