/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Button } from '../../src/components/index';


describe('Button', () => {
  const buttonText = '立即兑换';

  it('renders a button', () => {
    const spy = jasmine.createSpy(),
          button = TestUtils.renderIntoDocument(
            <Button onTouchTap={spy}>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.nodeName).toEqual('BUTTON');
    expect(buttonNode.type).toEqual('button');
    expect(buttonNode.textContent).toEqual(buttonText);
    expect(buttonNode.classList.contains('btn')).toBeTruthy();

    expect(spy.calls.count()).toEqual(0);
    TestUtils.Simulate.touchTap(buttonNode);
    expect(spy.calls.count()).toEqual(1);
  });

  it('disabled', () => {
    const button = TestUtils.renderIntoDocument(
            <Button disabled>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.disabled).toBeTruthy();
  });

  it('submit', () => {
    const button = TestUtils.renderIntoDocument(
            <Button type='submit'>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.type).toEqual('submit');
  });

  it('with icon', () => {
    const button = TestUtils.renderIntoDocument(
            <Button icon='money'>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.querySelector('.icon-money')).not.toBeNull();
  });

  it('link', () => {
    const button = TestUtils.renderIntoDocument(
            <Button icon='money' link>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.classList.contains('btn-link')).toBeTruthy();
  });

  it('additional class names', () => {
    const button = TestUtils.renderIntoDocument(
            <Button className='my-btn'>{buttonText}</Button>
          ),
          buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.classList.contains('btn')).toBeTruthy();
    expect(buttonNode.classList.contains('my-btn')).toBeTruthy();
  });
});