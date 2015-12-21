/**
 * Created by AshZhang on 15/10/25.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TableRow from '../TableRow.js';


describe('TableRow', () => {
  let tableRowData;

  beforeEach(() => {
    tableRowData = {
      text: '个人信息',
      note: '2015-10-10',
      href: 'profile'
    };
  });

  it('renders a table row', () => {
    const tableRow = TestUtils.renderIntoDocument(
            <div><TableRow {...tableRowData}></TableRow></div>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow).firstChild;

    expect(tableRowNode.nodeName).toEqual('LI');
    expect(tableRowNode.classList.contains('table-row')).toBeTruthy();
    expect(tableRowNode.querySelector('.table-row-link').href).toEqual(document.baseURI + '#/' + tableRowData.href);
    expect(tableRowNode.querySelector('.table-row-text').textContent).toEqual(tableRowData.text);
    expect(tableRowNode.querySelector('.table-row-note').textContent).toEqual(tableRowData.note);
    expect(tableRowNode.querySelector('.icon-arrow-right')).toBeNull();
  });

  it('disclosure arrow', () => {
    tableRowData.disclosure = true;

    const tableRow = TestUtils.renderIntoDocument(
            <div><TableRow {...tableRowData}></TableRow></div>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow).firstChild;;

    expect(tableRowNode.querySelector('.icon-arrow-right')).not.toBeNull();
  });

  it('children', () => {
    const tableRow = TestUtils.renderIntoDocument(
            <div>
              <TableRow {...tableRowData}>
                <img src='' alt='' />
              </TableRow>
            </div>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow).firstChild;;

    expect(tableRowNode.querySelector('.table-row-content img')).not.toBeNull();
  });

  it('events', () => {
    const spy = jasmine.createSpy();

    tableRowData.onTouchTap = spy();

    const tableRow = TestUtils.renderIntoDocument(
            <div>
              <TableRow {...tableRowData}>
                <img src='' alt='' />
              </TableRow>
            </div>
          ),
          tableRowNode = ReactDOM.findDOMNode(tableRow).firstChild;;

    TestUtils.Simulate.touchTap(tableRowNode);
    expect(spy.calls.count()).toEqual(1);
  });
});
