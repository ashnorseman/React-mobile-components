/**
 * Created by AshZhang on 15/10/25.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Icon } from '../../index';


describe('Icon', () => {
  const iconName = 'home';

  it('renders an icon', () => {
    const icon = TestUtils.renderIntoDocument(
            <div><Icon name={iconName}></Icon></div>
          ),
          iconNode = ReactDOM.findDOMNode(icon).firstChild;

    expect(iconNode.classList.contains('iconfont')).toBeTruthy();
    expect(iconNode.classList.contains('icon-home')).toBeTruthy();
  });

  it('rotate', () => {
    const icon = TestUtils.renderIntoDocument(
            <div><Icon name={iconName} rotate></Icon></div>
          ),
          iconNode = ReactDOM.findDOMNode(icon).firstChild;

    expect(iconNode.classList.contains('iconfont')).toBeTruthy();
    expect(iconNode.classList.contains('icon-rotate')).toBeTruthy();
  });
});
