/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Badge } from '../../src/components/index';


describe('Badge', () => {

  it('renders a badge', () => {
    const badge = TestUtils.renderIntoDocument(
            <Badge>9</Badge>
          ),
          badgeNode = ReactDOM.findDOMNode(badge);

    expect(badgeNode.classList.contains('badge')).toBeTruthy();
    expect(badgeNode.textContent).toEqual('9');
  });

  it('N', () => {
    const badge = TestUtils.renderIntoDocument(
            <Badge>10</Badge>
          ),
          badgeNode = ReactDOM.findDOMNode(badge);

    expect(badgeNode.classList.contains('badge')).toBeTruthy();
    expect(badgeNode.textContent).toEqual('N');
  });
});