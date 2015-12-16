/**
 * Created by AshZhang on 15/10/30.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Form } from '../../index';


describe('Form', () => {
  let formData;

  beforeEach(() => {
    formData = {
      action: '/form',
      controls: [
        {
          name: 'text',
          type: 'text',
          required: true
        }
      ],
      submitText: '提交'
    }
  });

  it('renders a form', () => {
    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form);

    expect(formNode.nodeName).toEqual('FORM');
    expect(formNode.action).toEqual(location.origin + '/form');
    expect(formNode.querySelectorAll('.form-line').length).toEqual(1);
    expect(formNode.querySelectorAll('input').length).toEqual(1);
    expect(formNode.querySelector('.form-submit')).not.toBeNull();
    expect(formNode.querySelector('button').textContent).toEqual(formData.submitText);
  });

  it('place submit button at the bottom of the page', () => {
    formData.submitAtPageBottom = true;

    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form);

    expect(formNode.querySelector('.form-submit.form-submit-bottom')).not.toBeNull();
    expect(document.querySelector('.form-submit-bottom-mounted')).not.toBeNull();
  });

  it('form with label', () => {
    formData = {
      controls: [
        {
          name: 'text',
          label: '文字',
          type: 'text',
          required: true
        },
        {
          name: 'number',
          label: '数字',
          type: 'number',
          required: true
        }
      ]
    };

    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form),
          labels = formNode.querySelectorAll('.form-label');

    expect(labels.length).toEqual(2);
    expect(labels[0].textContent).toEqual(formData.controls[0].label);
  });

  it('disable submit button if any form field is invalid', () => {
    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form),
          input = formNode.querySelector('input');

    expect(formNode.querySelector('button').disabled).toBeTruthy();

    input.value = '1';
    TestUtils.Simulate.change(input);
    //expect(formNode.querySelector('button').disabled).toBeFalsy();

    input.value = '';
    TestUtils.Simulate.change(input);
    //expect(formNode.querySelector('button').disabled).toBeTruthy();
  });

  it('beforeSubmit', () => {
    const spy = jasmine.createSpy();

    formData = {
      action: '/form',
      controls: [
        {
          name: 'text',
          type: 'text',
          required: true,
          value: 'abc'
        }
      ],
      submitText: '提交',
      beforeSubmit: spy
    };

    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form);

    TestUtils.Simulate.submit(formNode);

    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0].text).toEqual('abc');
  });

  it('onSubmit', () => {
    const spy = jasmine.createSpy();

    formData = {
      action: '/form',
      controls: [
        {
          name: 'text',
          type: 'text',
          required: true,
          value: 'abc'
        }
      ],
      submitText: '提交',
      beforeSubmit: function () { return true; },
      onSubmit: spy
    };

    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form);

    TestUtils.Simulate.submit(formNode);

    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0].text).toEqual('abc');
  });

  it('onSubmit: beforeSubmit returns false', () => {
    const spy = jasmine.createSpy();

    formData = {
      action: '/form',
      controls: [
        {
          name: 'text',
          type: 'text',
          required: true,
          value: 'abc'
        }
      ],
      submitText: '提交',
      beforeSubmit: function () { return false; },
      onSubmit: spy
    };

    const form = TestUtils.renderIntoDocument(
            <Form {...formData}></Form>
          ),
          formNode = ReactDOM.findDOMNode(form);

    TestUtils.Simulate.submit(formNode);

    expect(spy.calls.count()).toEqual(0);
  });
});