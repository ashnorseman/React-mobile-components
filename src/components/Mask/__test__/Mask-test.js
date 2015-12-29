/**
 * Created by AshZhang on 15/11/10.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Mask } from '../../index';


describe('Mask', () => {

  it('open and close', () => {
    Mask.open({
      zIndex: 100,
      onTouchTap: Mask.close
    });

    const mask = document.querySelector('.mask');

    expect(mask).not.toBeNull();
    expect(mask.style.zIndex).toEqual('100');

    TestUtils.Simulate.touchTap(mask);
    //expect(document.querySelector('.mask')).toBeNull();
  });
});
