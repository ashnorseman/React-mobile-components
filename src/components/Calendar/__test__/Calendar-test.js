/**
 * Created by AshZhang on 15/12/3.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Calendar } from '../../index';


describe('Calendar', () => {
  const calendarData = {
    date: new Date(2015, 11, 31),
    highlights: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 10).valueOf()],
    marks: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 20).valueOf()]
  };

  it('renders a calendar', () => {
    const calendar = TestUtils.renderIntoDocument(
        <Calendar {...calendarData} />
      ),
      calendarNode = ReactDOM.findDOMNode(calendar);

    expect(calendarNode.classList.contains('calendar')).toBeTruthy();
    expect(calendarNode.querySelectorAll('li').length).toEqual(42);
    expect(calendarNode.querySelectorAll('.calendar-not-this-month').length).toEqual(4);
    expect(calendarNode.querySelectorAll('.calendar-highlight').length).toEqual(2);
    expect(calendarNode.querySelectorAll('.calendar-mark').length).toEqual(2);
  });
});
