/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Table from '../../src/components/Table/Table.jsx';


describe('Table', () => {
  let tableData;

  beforeEach(() => {
    tableData = [
      {
        text: '个人信息',
        href: 'profile',
        disclosure: true
      },
      {
        text: '收货地址',
        href: 'address',
        disclosure: true
      }
    ];
  });

  it('renders a table row', () => {
    const table = TestUtils.renderIntoDocument(
            <Table data={tableData}></Table>
          ),
          tableNode = ReactDOM.findDOMNode(table);

    expect(tableNode.nodeName).toEqual('UL');
    expect(tableNode.classList.contains('table')).toBeTruthy();
    expect(tableNode.querySelectorAll('.table-row').length).toEqual(2);
  });
});