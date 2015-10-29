/**
 * Created by AshZhang on 15/10/29.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Form } from '../../src/components/index';


describe('FormControl', () => {

  it('input type=...', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Form.Control type='text' defaultValue='text-v' placeholder='text-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          formControl2 = TestUtils.renderIntoDocument(
            <Form.Control type='text' />
          ),
          formControlNode2 = ReactDOM.findDOMNode(formControl2);

    expect(formControlNode.classList.contains('form-control')).toBeTruthy();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();
    expect(formControlNode.querySelector('input[type=text]').value).toEqual('text-v');
    expect(formControlNode.querySelector('.form-placeholder').textContent).toEqual('text-p');

    expect(formControlNode2.classList.contains('form-has-value')).toBeFalsy();
    expect(formControlNode2.classList.contains('form-no-value')).toBeTruthy();
  });

  it('textarea', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Form.Control type='textarea' defaultValue='textarea-v' placeholder='textarea-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl);

    expect(formControlNode.classList.contains('form-control')).toBeTruthy();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();
    expect(formControlNode.querySelector('textarea').value).toEqual('textarea-v');
    expect(formControlNode.querySelector('.form-placeholder').textContent).toEqual('textarea-p');
  });

  it('select', () => {
    const options = [
            {
              value: '1',
              text: '选项 1'
            },
            {
              value: '2',
              text: '选项 2'
            }
          ],
          formControl = TestUtils.renderIntoDocument(
            <Form.Control type='select' options={options} defaultValue='1' placeholder='select-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl);

    expect(formControlNode.classList.contains('form-control')).toBeTruthy();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();

    expect(formControlNode.querySelector('select')).not.toBeNull();
    expect(formControlNode.querySelectorAll('option').length).toEqual(2);
    expect(formControlNode.querySelector('.form-placeholder').textContent).toEqual('select-p');
  });

  it('tap placeholder to focus', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Form.Control type='text' defaultValue='text-v' placeholder='text-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          placeholder = formControlNode.querySelector('.form-placeholder'),
          input = formControlNode.querySelector('input');

    expect(formControlNode.classList.contains('form-focused')).toBeFalsy();

    TestUtils.Simulate.touchTap(placeholder);
    expect(formControlNode.classList.contains('form-focused')).toBeTruthy();
    //expect(input).toEqual(document.activeElement);
  });

  it('change to toggle `has-value` `no-value` events', () => {
    const spy = jasmine.createSpy(),
          formControl = TestUtils.renderIntoDocument(
            <Form.Control type='text' defaultValue='text-v' placeholder='text-p' onChange={spy} />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          input = formControlNode.querySelector('input');

    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();

    input.value = '';
    TestUtils.Simulate.change(input);
    expect(formControlNode.classList.contains('form-has-value')).toBeFalsy();
    expect(formControlNode.classList.contains('form-no-value')).toBeTruthy();
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0].target.value).toEqual('');

    input.value = 'new';
    TestUtils.Simulate.change(input);
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0].target.value).toEqual('new');
  });

  it('blur to remove `form-focused`', () => {
    const spy = jasmine.createSpy(),
          formControl = TestUtils.renderIntoDocument(
            <Form.Control type='text' defaultValue='text-v' placeholder='text-p' onBlur={spy} />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          placeholder = formControlNode.querySelector('.form-placeholder'),
          input = formControlNode.querySelector('input');

    TestUtils.Simulate.touchTap(placeholder);
    expect(formControlNode.classList.contains('form-focused')).toBeTruthy();

    TestUtils.Simulate.blur(input);
    expect(formControlNode.classList.contains('form-focused')).toBeFalsy();
  });

  it('validation', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Form.Control type='text' required />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          input = formControlNode.querySelector('input');

    input.value = '1';
    TestUtils.Simulate.blur(input);
    expect(formControlNode.classList.contains('form-error')).toBeFalsy();

    input.value = '';
    TestUtils.Simulate.blur(input);
    expect(formControlNode.classList.contains('form-error')).toBeTruthy();
  });
});