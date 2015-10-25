/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TableRow from '../../src/components/Table/TableRow.jsx';


describe('TableRow', () => {
  let tableRowData;

  beforeEach(() => {
    tableRowData = {
      text: '个人信息',
      href: 'profile'
    };
  });

  it('renders a table row', () => {
    const tableRow = TestUtils.renderIntoDocument(
            <TableRow {...tableRowData}></TableRow>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow);

    expect(tableRowNode.nodeName).toEqual('LI');
    expect(tableRowNode.classList.contains('table-row')).toBeTruthy();
    expect(tableRowNode.querySelector('.table-row-link').href).toEqual(document.baseURI + '#/' + tableRowData.href);
    expect(tableRowNode.querySelector('.table-row-text').textContent).toEqual(tableRowData.text);
    expect(tableRowNode.querySelector('.icon-arrow-right')).toBeNull();
  });

  it('renders a table row with a disclosure arrow', () => {
    tableRowData.disclosure = true;

    const tableRow = TestUtils.renderIntoDocument(
            <TableRow {...tableRowData}></TableRow>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow);

    expect(tableRowNode.querySelector('.icon-arrow-right')).not.toBeNull();
  });
});