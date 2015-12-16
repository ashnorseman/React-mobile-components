/**
 * Created by AshZhang on 15/10/25.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { TopAction } from '../../index';


describe('TopAction', () => {

  it('renders a `go-to-top` action button', () => {
    const topAction = TestUtils.renderIntoDocument(
            <TopAction></TopAction>
          ),
          topActionNode = ReactDOM.findDOMNode(topAction);

    expect(topActionNode.classList.contains('top-action')).toBeTruthy();
    expect(topActionNode.querySelector('.iconfont')).not.toBeNull();
  });

  it('scroll viewport to top', () => {
    const topAction = TestUtils.renderIntoDocument(
            <TopAction></TopAction>
          ),
          topActionNode = ReactDOM.findDOMNode(topAction);

    expect(topActionNode.style.display).toEqual('none');

    window.scroll(0, 200);
    TestUtils.Simulate.touchTap(topActionNode);
    expect(window.pageYOffset).toEqual(0);
  });
});