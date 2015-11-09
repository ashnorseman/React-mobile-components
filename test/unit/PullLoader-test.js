/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { PullLoader } from '../../src/components/index';


describe('PullLoader', () => {

  it('renders a pull-loader', () => {
    const instance = TestUtils.renderIntoDocument(
            <PullLoader onPull={() => {}}><h1>PullLoader</h1></PullLoader>
          ),
          loaderNode = ReactDOM.findDOMNode(instance);

    expect(loaderNode.querySelector('h1').textContent).toEqual('PullLoader');
  });

  it('loading', () => {
    const instance = TestUtils.renderIntoDocument(
            <PullLoader onPull={() => {}} loading><h1>PullLoader</h1></PullLoader>
          ),
          loaderNode = ReactDOM.findDOMNode(instance);

    expect(loaderNode.querySelector('h1').textContent).toEqual('PullLoader');
    expect(loaderNode.querySelector('.loading')).not.toBeNull();
  });
});