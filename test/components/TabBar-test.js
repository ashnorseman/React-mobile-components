/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import TabBar from '../../src/components/Tab/TabBar.jsx';


describe('TabBar', () => {
  let tabBarData;

  beforeEach(() => {
    tabBarData = [
      {
        icon: 'home',
        text: '积分互动',
        link: 'home',
        active: true
      },
      {
        badge: '9',
        icon: 'gift-box',
        text: '礼品箱',
        link: 'gift-box'
      }
    ];
  });

  it('renders a tab bar', () => {
    const tabBar = TestUtils.renderIntoDocument(
            <TabBar data={tabBarData}></TabBar>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(tabBarNode.nodeName).toEqual('NAV');
    expect(tabBarNode.classList.contains('tab')).toBeTruthy();
    expect(tabBarNode.classList.contains('tab-bar')).toBeTruthy();
    expect(tabBarNode.querySelectorAll('.tab-item').length).toEqual(2);
  });

  it('toggles `tab-bar-mounted` class on `body`', () => {
    const tabBar = TestUtils.renderIntoDocument(
            <TabBar data={tabBarData}></TabBar>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(document.body.classList.contains('tab-bar-mounted')).toBeTruthy();
  });
});