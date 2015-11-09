/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Tab } from '../../src/components/index';


describe('TabBar', () => {
  let tabScopeData;

  beforeEach(() => {
    tabScopeData = [
      {
        text: '全部',
        link: 'history/1'
      },
      {
        text: '已发货',
        link: 'history/2'
      }
    ];
  });

  it('renders a tab bar', () => {
    const tabScope = TestUtils.renderIntoDocument(
            <Tab.Scope data={tabScopeData}></Tab.Scope>
          ),
          tabScopeNode = ReactDOM.findDOMNode(tabScope);

    expect(tabScopeNode.nodeName).toEqual('NAV');
    expect(tabScopeNode.classList.contains('tab')).toBeTruthy();
    expect(tabScopeNode.classList.contains('tab-scope')).toBeTruthy();
    expect(tabScopeNode.querySelectorAll('.tab-item').length).toEqual(2);
  });

  it('toggles `tab-bar-mounted` class on `body`', () => {
    const tabScope = TestUtils.renderIntoDocument(
            <Tab.Scope data={tabScopeData}></Tab.Scope>
          ),
          tabScopeNode = ReactDOM.findDOMNode(tabScope);

    expect(document.body.firstElementChild.classList.contains('tab-scope-mounted')).toBeTruthy();
  });

  it('listens to `hashchange` and toggles `active` class', () => {
    const tabScope = TestUtils.renderIntoDocument(
            <Tab.Scope data={tabScopeData}></Tab.Scope>
          ),
          tabScopeNode = ReactDOM.findDOMNode(tabScope);

    expect(tabScopeNode.querySelector('.active')).toBeNull();
  });
});