/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Icon from '../../src/components/Icon/Icon.jsx';


describe('Icon', () => {
  const iconName = 'home';

  it('renders an icon', () => {
    const icon = TestUtils.renderIntoDocument(
            <Icon name={iconName}></Icon>
          ),
          iconNode = ReactDOM.findDOMNode(icon);

    expect(iconNode.classList.contains('iconfont')).toBeTruthy();
    expect(iconNode.classList.contains('icon-home')).toBeTruthy();
  });
});