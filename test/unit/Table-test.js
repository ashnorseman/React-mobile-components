/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Table } from '../../src/components/index';


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

    expect(tableNode.nodeName).toEqual('DIV');
    expect(tableNode.classList.contains('table')).toBeTruthy();
    expect(tableNode.querySelectorAll('.table-rows')).toBeTruthy();
    expect(tableNode.querySelectorAll('.table-row').length).toEqual(2);
  });

  it('with table header', () => {
    const table = TestUtils.renderIntoDocument(
            <Table data={tableData} expanded={true}>
              <span>Table Header</span>
            </Table>
          ),
          tableNode = ReactDOM.findDOMNode(table);

    expect(tableNode.querySelector('.table-header').textContent).toEqual('Table Header');
    expect(tableNode.querySelector('.icon-arrow-down')).toBeTruthy();
  });

  it('toggle table rows', () => {
    const spy = jasmine.createSpy(),
          table = TestUtils.renderIntoDocument(
            <Table data={tableData} expanded={true} onToggle={spy}>
              <span>Table Header</span>
            </Table>
          ),
          tableNode = ReactDOM.findDOMNode(table),
          header = tableNode.querySelector('.table-header'),
          rows = tableNode.querySelector('.table-rows');

    expect(tableNode.querySelector('.expanded.icon-arrow-down')).toBeTruthy();

    TestUtils.Simulate.touchTap(header);
    expect(tableNode.querySelector('.expanded.icon-arrow-down')).toBeFalsy();
    expect(rows.classList.contains('collapsed')).toBeTruthy();
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual(false);

    TestUtils.Simulate.touchTap(header);
    expect(tableNode.querySelector('.expanded.icon-arrow-down')).toBeTruthy();
    expect(rows.classList.contains('collapsed')).toBeFalsy();
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0]).toEqual(true);
  });
});