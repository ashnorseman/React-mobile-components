/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Tab from '../../src/components/Tab/Tab.jsx';


describe('Tab', () => {
  let tabData;

  beforeEach(() => {
    tabData = {
      icon: 'home',
      text: '积分互动',
      link: 'home',
      type: 1
    };
  });

  it('renders a tab', () => {
    const tab = TestUtils.renderIntoDocument(
            <Tab {...tabData}></Tab>
          ),
          tabNode = ReactDOM.findDOMNode(tab);

    expect(tabNode.nodeName).toEqual('A');
    expect(tabNode.href).toEqual(document.baseURI + '#/home');
    expect(tabNode.classList.contains('tab-item')).toBeTruthy();
    expect(tabNode.classList.contains('tab-item-type-1')).toBeTruthy();
    expect(tabNode.classList.contains('active')).toBeFalsy();
    expect(tabNode.querySelector('.badge')).toBeNull();
    expect(tabNode.querySelector('.tab-text').textContent).toEqual(tabData.text);
    expect(tabNode.querySelector('.iconfont').classList.contains('icon-home')).toBeTruthy();
  });

  it('renders a tab with a badge', () => {
    tabData.badge = '9';

    const tab = TestUtils.renderIntoDocument(
            <Tab {...tabData}></Tab>
          ),
          tabNode = ReactDOM.findDOMNode(tab);

    expect(tabNode.querySelector('.badge').textContent).toEqual(tabData.badge);
  });

  it('renders an active tab', () => {
    tabData.active = true;

    const tab = TestUtils.renderIntoDocument(
            <Tab {...tabData}></Tab>
          ),
          tabNode = ReactDOM.findDOMNode(tab);

    expect(tabNode.classList.contains('active')).toBeTruthy();
  });
});