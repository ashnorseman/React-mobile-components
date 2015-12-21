/**
 * Created by AshZhang on 15/10/25.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Badge } from '../../index';


describe('Badge', () => {

  it('renders a badge', () => {
    const badge = TestUtils.renderIntoDocument(
            <div><Badge>9</Badge></div>
          ),
          badgeNode = ReactDOM.findDOMNode(badge).firstChild;

    expect(badgeNode.classList.contains('badge')).toBeTruthy();
    expect(badgeNode.textContent).toEqual('9');
  });

  it('99+', () => {
    const badge = TestUtils.renderIntoDocument(
            <div><Badge>100</Badge></div>
          ),
          badgeNode = ReactDOM.findDOMNode(badge).firstChild;

    expect(badgeNode.classList.contains('badge')).toBeTruthy();
    expect(badgeNode.textContent).toEqual('99+');
  });
});
