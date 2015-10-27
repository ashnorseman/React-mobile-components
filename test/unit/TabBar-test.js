/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Tab } from '../../src/components/index';


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
            <Tab.Bar data={tabBarData}></Tab.Bar>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(tabBarNode.nodeName).toEqual('NAV');
    expect(tabBarNode.classList.contains('tab')).toBeTruthy();
    expect(tabBarNode.classList.contains('tab-bar')).toBeTruthy();
    expect(tabBarNode.querySelectorAll('.tab-item').length).toEqual(2);
  });

  it('toggles `tab-bar-mounted` class on `body`', () => {
    const tabBar = TestUtils.renderIntoDocument(
            <Tab.Bar data={tabBarData}></Tab.Bar>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(document.body.classList.contains('tab-bar-mounted')).toBeTruthy();
  });

  it('listens to `hashchange` and toggles `active` class', () => {
    const tabBar = TestUtils.renderIntoDocument(
            <Tab.Bar data={tabBarData}></Tab.Bar>
          ),
          tabBarNode = ReactDOM.findDOMNode(tabBar);

    expect(tabBarNode.querySelector('.active')).toBeNull();
  });
});