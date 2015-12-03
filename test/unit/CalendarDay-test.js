/**
 * Created by AshZhang on 15/12/3.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CalendarDay from '../../src/components/Calendar/CalendarDay';


describe('CalendarDay', () => {
  const calendarData = {
    date: new Date(2015, 10, 30),
    highlights: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 10).valueOf()],
    marks: [new Date(2015, 11, 1).valueOf(), new Date(2015, 11, 20).valueOf()]
  };

  it('renders a calendar day', () => {
    const calendar = TestUtils.renderIntoDocument(
        <CalendarDay {...calendarData} />
      ),
      calendarNode = ReactDOM.findDOMNode(calendar);

    expect(calendarNode.classList.contains('calendar-not-this-month')).toBeTruthy();
    expect(calendarNode.classList.contains('calendar-highlight')).toBeFalsy();
    expect(calendarNode.classList.contains('calendar-mark')).toBeFalsy();
  });

  it('highlight', () => {
    calendarData.date = new Date(2015, 11, 10);

    const calendar = TestUtils.renderIntoDocument(
        <CalendarDay {...calendarData} />
      ),
      calendarNode = ReactDOM.findDOMNode(calendar);

    expect(calendarNode.classList.contains('calendar-not-this-month')).toBeFalsy();
    expect(calendarNode.classList.contains('calendar-highlight')).toBeTruthy();
    expect(calendarNode.classList.contains('calendar-mark')).toBeFalsy();
  });

  it('mark', () => {
    calendarData.date = new Date(2015, 11, 20);

    const calendar = TestUtils.renderIntoDocument(
        <CalendarDay {...calendarData} />
      ),
      calendarNode = ReactDOM.findDOMNode(calendar);

    expect(calendarNode.classList.contains('calendar-not-this-month')).toBeFalsy();
    expect(calendarNode.classList.contains('calendar-highlight')).toBeFalsy();
    expect(calendarNode.classList.contains('calendar-mark')).toBeTruthy();
    expect(calendarNode.querySelector('.iconfont')).not.toBeNull();
  });

  it('both', () => {
    calendarData.date = new Date(2015, 11, 1);

    const calendar = TestUtils.renderIntoDocument(
        <CalendarDay {...calendarData} />
      ),
      calendarNode = ReactDOM.findDOMNode(calendar);

    expect(calendarNode.classList.contains('calendar-not-this-month')).toBeFalsy();
    expect(calendarNode.classList.contains('calendar-highlight')).toBeTruthy();
    expect(calendarNode.classList.contains('calendar-mark')).toBeTruthy();
  });
});
