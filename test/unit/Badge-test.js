/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Badge } from '../../src/components/index';


describe('Badge', () => {
  const badgeText = '9';

  it('renders a badge', () => {
    const badge = TestUtils.renderIntoDocument(
            <Badge>{badgeText}</Badge>
          ),
          badgeNode = ReactDOM.findDOMNode(badge);

    expect(badgeNode.classList.contains('badge')).toBeTruthy();
    expect(badgeNode.textContent).toEqual(badgeText);
  });
});