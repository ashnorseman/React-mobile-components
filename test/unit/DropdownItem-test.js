/**
 * Created by AshZhang on 15/11/10.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import DropdownItem from '../../src/components/Dropdown/DropdownItem';


describe('DropdownItem', () => {
  const itemData = {
    name: 'all',
    text: '全部',
    active: false
  };

  it('renders a dropdown item', () => {
    const instance = TestUtils.renderIntoDocument(
            <DropdownItem {...itemData} />
          ),
          itemNode = ReactDOM.findDOMNode(instance);

    expect(itemNode.classList.contains('dropdown-item')).toBeTruthy();
    expect(itemNode.textContent).toEqual(itemData.text);
  });

  it('active', () => {
    itemData.active = true;

    const instance = TestUtils.renderIntoDocument(
            <DropdownItem {...itemData} />
          ),
          itemNode = ReactDOM.findDOMNode(instance);

    expect(itemNode.classList.contains('active')).toBeTruthy();
    expect(itemNode.querySelector('.icon-checked')).not.toBeNull();
  });
});