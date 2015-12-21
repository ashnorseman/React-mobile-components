/**
 * Created by AshZhang on 15/11/9.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Loading } from '../../index';


describe('Loading', () => {

  it('renders a loading', () => {
    const instance = TestUtils.renderIntoDocument(
            <div><Loading /></div>
          ),
          loadingNode = ReactDOM.findDOMNode(instance).firstChild;

    expect(loadingNode.classList.contains('loading')).toBeTruthy();
  });
});
