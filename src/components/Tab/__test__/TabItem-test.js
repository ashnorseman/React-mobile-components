/**
 * Created by AshZhang on 15/10/25.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Tab from '../TabItem.js';


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
            <div><Tab {...tabData}></Tab></div>
          ),
          tabNode = ReactDOM.findDOMNode(tab).firstChild;

    expect(tabNode.nodeName).toEqual('A');
    expect(tabNode.href).toEqual(document.baseURI + '#/home');
    expect(tabNode.classList.contains('tab-item')).toBeTruthy();
    expect(tabNode.classList.contains('tab-item-type-1')).toBeTruthy();
    expect(tabNode.classList.contains('active')).toBeFalsy();
    expect(tabNode.querySelector('.badge')).toBeNull();
    expect(tabNode.querySelector('.tab-text').textContent).toEqual(tabData.text);
    expect(tabNode.querySelector('.iconfont').classList.contains('icon-home')).toBeTruthy();
  });

  it('link to other pages', () => {
    const tab = TestUtils.renderIntoDocument(
            <div><Tab {...tabData} link='http://www.taobao.com/'></Tab></div>
          ),
          tabNode = ReactDOM.findDOMNode(tab).firstChild,
          tab2 = TestUtils.renderIntoDocument(
            <div><Tab {...tabData} link='https://www.taobao.com/'></Tab></div>
          ),
          tabNode2 = ReactDOM.findDOMNode(tab2).firstChild,
          tab3 = TestUtils.renderIntoDocument(
            <div><Tab {...tabData} link='//www.taobao.com/'></Tab></div>
          ),
          tabNode3 = ReactDOM.findDOMNode(tab3).firstChild;

    expect(tabNode.href).toEqual('http://www.taobao.com/');
    expect(tabNode2.href).toEqual('https://www.taobao.com/');
    expect(tabNode3.href).toEqual('http://www.taobao.com/');
  });

  it('renders a tab with a badge', () => {
    tabData.badge = '9';

    const tab = TestUtils.renderIntoDocument(
            <div><Tab {...tabData}></Tab></div>
          ),
          tabNode = ReactDOM.findDOMNode(tab).firstChild;

    expect(tabNode.querySelector('.badge').textContent).toEqual(tabData.badge);
  });

  it('renders an active tab', () => {
    tabData.active = true;

    const tab = TestUtils.renderIntoDocument(
            <div><Tab {...tabData}></Tab></div>
          ),
          tabNode = ReactDOM.findDOMNode(tab).firstChild;

    expect(tabNode.classList.contains('active')).toBeTruthy();
  });
});
