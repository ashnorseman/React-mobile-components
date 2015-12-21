/**
 * Created by AshZhang on 15/12/14.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { ChoiceList } from '../../index';


describe('Choice', () => {
  const choiceData = [
    {
      name: 'white',
      text: '白色'
    },
    {
      name: 'black',
      text: '黑色',
      checked: true
    },
    {
      name: 'khaki',
      text: '卡其色',
      disabled: true
    }
  ];

  it('renders a choice list', () => {
    const instance = TestUtils.renderIntoDocument(
        <div><ChoiceList data={choiceData} /></div>
      ),
      choice = ReactDOM.findDOMNode(instance).firstChild;

    expect(choice.querySelectorAll('.choice-item').length).toEqual(3);
    expect(choice.querySelector('.choice-item-checked').textContent).toEqual('黑色');
    expect(choice.querySelector('.choice-item-disabled').textContent).toEqual('卡其色');
  });

  it('onToggle', () => {
    const spy = jasmine.createSpy(),
      instance = TestUtils.renderIntoDocument(
        <div><ChoiceList data={choiceData} onToggle={spy} /></div>
      ),
      choice = ReactDOM.findDOMNode(instance).firstChild,
      items = choice.querySelectorAll('.choice-item');

    TestUtils.Simulate.touchTap(items[0]);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args).toEqual(['white', true]);

    TestUtils.Simulate.touchTap(items[1]);
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args).toEqual(['black', false]);

    TestUtils.Simulate.touchTap(items[2]);
    expect(spy.calls.count()).toEqual(2);
  });
});
