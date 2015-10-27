/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Tab } from '../../src/components/index';


describe('TabNav', () => {
  let tabNavData;

  beforeEach(() => {
    tabNavData = [
      {
        icon: 'home',
        text: '积分互动',
        link: 'home',
        type: 1
      },
      {
        badge: '9',
        icon: 'gift-box',
        text: '礼品箱',
        link: 'gift-box',
        type: 2
      }
    ];
  });

  it('renders a tab bar', () => {
    const tabBar = TestUtils.renderIntoDocument(
            <Tab.Nav data={tabNavData}></Tab.Nav>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(tabBarNode.nodeName).toEqual('NAV');
    expect(tabBarNode.classList.contains('tab')).toBeTruthy();
    expect(tabBarNode.classList.contains('tab-nav')).toBeTruthy();
    expect(tabBarNode.querySelectorAll('.tab-item').length).toEqual(2);
  });
});