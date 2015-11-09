/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Message } from '../../src/components/index';


describe('Message', () => {

  it('renders a message', () => {
    Message('message');

    expect(document.querySelector('.message').textContent).toEqual('message');
  });
});