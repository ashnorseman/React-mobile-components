/**
 * Created by AshZhang on 15/10/29.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { FormControl } from '../../index';


describe('FormControl', () => {

  class Tester extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        test: this.props.defaultValue
      };
    }

    render() {
      return (
        <FormControl name='test'
                     value={this.state.test}
                     {...this.props}
                     onChange={this.controlChange.bind(this)} />
      );
    }

    controlChange(name, value) {
      this.setState({
        test: value
      });

      if (this.props.onChange) {
        this.props.onChange(name, value);
      }
    }
  }


  it('input type=...', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Tester type='text' defaultValue='test-v' placeholder='text-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          formControl2 = TestUtils.renderIntoDocument(
            <Tester type='text' />
          ),
          formControlNode2 = ReactDOM.findDOMNode(formControl2);

    expect(formControlNode.classList.contains('form-control')).toBeTruthy();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();
    expect(formControlNode.querySelector('input[type=text]').value).toEqual('test-v');
    expect(formControlNode.querySelector('.form-placeholder').textContent).toEqual('text-p');

    expect(formControlNode2.classList.contains('form-has-value')).toBeFalsy();
    expect(formControlNode2.classList.contains('form-no-value')).toBeTruthy();
  });

  it('textarea', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Tester type='textarea' defaultValue='textarea-v' placeholder='textarea-p' />
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
            <Tester type='select' options={options} value='1' placeholder='select-p' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl);

    expect(formControlNode.classList.contains('form-control')).toBeTruthy();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();

    expect(formControlNode.querySelector('select')).not.toBeNull();
    expect(formControlNode.querySelectorAll('option').length).toEqual(2);
    expect(formControlNode.querySelector('.form-placeholder').textContent).toEqual('select-p');
  });

  it('clear button for inputs', () => {
    const spy = jasmine.createSpy(),
          formControl = TestUtils.renderIntoDocument(
            <Tester type='text' value='text-v' placeholder='text-p' onChange={spy} />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          input = formControlNode.querySelector('input'),
          clear = formControlNode.querySelector('.form-clear');

    expect(clear).not.toBeNull();
    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();

    TestUtils.Simulate.touchTap(clear);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('test');
    expect(spy.calls.mostRecent().args[1]).toEqual('');
  });

  it('change to toggle `has-value` `no-value` events', () => {
    const spy = jasmine.createSpy(),
          formControl = TestUtils.renderIntoDocument(
            <Tester type='text' value='text-v' placeholder='text-p' onChange={spy} />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          input = formControlNode.querySelector('input');

    expect(formControlNode.classList.contains('form-has-value')).toBeTruthy();
    expect(formControlNode.classList.contains('form-no-value')).toBeFalsy();

    input.value = '';
    TestUtils.Simulate.change(input);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('test');
    expect(spy.calls.mostRecent().args[1]).toEqual('');

    input.value = 'new';
    TestUtils.Simulate.change(input);
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0]).toEqual('test');
    expect(spy.calls.mostRecent().args[1]).toEqual('new');
  });

  // Can not test
  //it('blur to remove `form-control-focused`', () => {
  //  const spy = jasmine.createSpy(),
  //        formControl = TestUtils.renderIntoDocument(
  //          <Tester type='text' name='blur' value='text-v' placeholder='text-p' onBlur={spy} />
  //        ),
  //        formControlNode = ReactDOM.findDOMNode(formControl),
  //        input = formControlNode.querySelector('input');
  //
  //  TestUtils.Simulate.focus(input);
  //  expect(document.body.classList.contains('form-control-focused')).toBeTruthy();
  //
  //  TestUtils.Simulate.blur(input);
  //  expect(document.body.classList.contains('form-control-focused')).toBeFalsy();
  //
  //  TestUtils.Simulate.focus(input);
  //  expect(document.body.classList.contains('form-control-focused')).toBeTruthy();
  //});

  it('validation', () => {
    const formControl = TestUtils.renderIntoDocument(
            <Tester type='text' required value='1' />
          ),
          formControlNode = ReactDOM.findDOMNode(formControl),
          formControl2 = TestUtils.renderIntoDocument(
            <Tester type='text' required />
          ),
          formControlNode2 = ReactDOM.findDOMNode(formControl2);

    expect(formControlNode.classList.contains('form-error')).toBeFalsy();

    //expect(formControlNode2.classList.contains('form-error')).toBeTruthy();
  });
});