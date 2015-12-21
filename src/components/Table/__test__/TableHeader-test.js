/**
 * Created by AshZhang on 15/11/2.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TableHeader from '../TableHeader.js';

describe('TableHeader', () => {

  it('renders a table header', () => {
    const tableHeader = TestUtils.renderIntoDocument(
        <div>
          <TableHeader>
            <span>本月积分</span>
            <span className='text-primary'>600</span>
          </TableHeader>
        </div>
      ),
      tableHeaderNode = ReactDOM.findDOMNode(tableHeader).firstChild;

    expect(tableHeaderNode.nodeName).toEqual('HEADER');
    expect(tableHeaderNode.className).toEqual('table-header');
    expect(tableHeaderNode.textContent).toEqual('本月积分600');
    expect(tableHeaderNode.querySelector('.text-primary').textContent).toEqual('600');
  });

  it('expanded', () => {
    const tableHeader = TestUtils.renderIntoDocument(
        <div><TableHeader expanded={true}></TableHeader></div>
      ),
      tableHeaderNode = ReactDOM.findDOMNode(tableHeader).firstChild,
      tableHeader2 = TestUtils.renderIntoDocument(
        <div><TableHeader expanded={false}></TableHeader></div>
      ),
      tableHeaderNode2 = ReactDOM.findDOMNode(tableHeader2).firstChild;

    expect(tableHeaderNode.querySelector('.expanded.icon-arrow-down')).not.toBeNull();
    expect(tableHeaderNode2.querySelector('.expanded.icon-arrow-down')).toBeNull();
    expect(tableHeaderNode2.querySelector('.icon-arrow-down')).not.toBeNull();
  });
});
