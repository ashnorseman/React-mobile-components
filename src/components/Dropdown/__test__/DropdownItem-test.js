/**
 * Created by AshZhang on 15/11/10.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import DropdownItem from '../DropdownItem';


describe('DropdownItem', () => {
  const itemData = {
    name: 'all',
    text: '全部',
    active: false
  };

  it('renders a dropdown item', () => {
    const instance = TestUtils.renderIntoDocument(
            <div><DropdownItem {...itemData} /></div>
          ),
          itemNode = ReactDOM.findDOMNode(instance).firstChild;

    expect(itemNode.classList.contains('dropdown-item')).toBeTruthy();
    expect(itemNode.textContent).toEqual(itemData.text);
  });

  it('active', () => {
    itemData.active = true;

    const instance = TestUtils.renderIntoDocument(
            <div><DropdownItem {...itemData} /></div>
          ),
          itemNode = ReactDOM.findDOMNode(instance).firstChild;

    expect(itemNode.classList.contains('active')).toBeTruthy();
    expect(itemNode.querySelector('.icon-checked')).not.toBeNull();
  });
});