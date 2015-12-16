/**
 * Created by AshZhang on 15/11/9.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import DropdownTitle from '../DropdownTitle';


describe('DropdownTitle', () => {
  let dropDownTitle;

  beforeEach(() => {
    dropDownTitle = {
      name: 'sort',
      text: '排序',
      active: false,
      opened: false
    };
  });

  it('renders a dropdown title', () => {
    const instance = TestUtils.renderIntoDocument(
            <DropdownTitle {...dropDownTitle} />
          ),
          titleNode = ReactDOM.findDOMNode(instance);

    expect(titleNode.classList.contains('dropdown-title')).toBeTruthy();
    expect(titleNode.classList.contains('active')).toBeFalsy();
    expect(titleNode.querySelector('.icon-arrow-down')).not.toBeNull();
  });

  it('active', () => {
    dropDownTitle.active = true;

    const instance = TestUtils.renderIntoDocument(
            <DropdownTitle {...dropDownTitle} />
          ),
          titleNode = ReactDOM.findDOMNode(instance);

    expect(titleNode.classList.contains('active')).toBeTruthy();
  });

  it('opened', () => {
    dropDownTitle.opened = true;

    const instance = TestUtils.renderIntoDocument(
            <DropdownTitle {...dropDownTitle} />
          ),
          titleNode = ReactDOM.findDOMNode(instance);

    expect(titleNode.classList.contains('opened')).toBeTruthy();
    expect(titleNode.querySelector('.icon-arrow-down')).not.toBeNull();
  });
});