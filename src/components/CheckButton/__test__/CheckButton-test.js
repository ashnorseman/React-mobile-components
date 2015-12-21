/**
 * Created by AshZhang on 15/10/30.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { CheckButton } from '../../index';


describe('CheckButton', () => {
  const buttonText = '设为默认';

  it('renders a check button', () => {
    const checkBtn = TestUtils.renderIntoDocument(
            <div><CheckButton>{buttonText}</CheckButton></div>
          ),
          checkBtnNode = ReactDOM.findDOMNode(checkBtn).firstChild;

    expect(checkBtnNode.nodeName).toEqual('BUTTON');
    expect(checkBtnNode.querySelector('.icon-unchecked')).not.toBeNull();
    expect(checkBtnNode.textContent).toEqual(buttonText);
  });

  it('checked', () => {
    const checkBtn = TestUtils.renderIntoDocument(
            <div><CheckButton checked>{buttonText}</CheckButton></div>
          ),
          checkBtnNode = ReactDOM.findDOMNode(checkBtn).firstChild;

    expect(checkBtnNode.classList.contains('check-btn-checked')).toBeTruthy();
    expect(checkBtnNode.querySelector('.icon-checked')).not.toBeNull();
  });

  it('onToggle', () => {
    const spy = jasmine.createSpy();

    const checkBtn = TestUtils.renderIntoDocument(
            <div><CheckButton onToggle={spy}>{buttonText}</CheckButton></div>
          ),
          checkBtnNode = ReactDOM.findDOMNode(checkBtn).firstChild;

    TestUtils.Simulate.touchTap(checkBtnNode);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual(true);

    TestUtils.Simulate.touchTap(checkBtnNode);
    expect(spy.calls.count()).toEqual(2);
  });
});
