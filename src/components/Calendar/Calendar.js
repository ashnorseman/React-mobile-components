/**
 * Created by AshZhang on 15/12/3.
 */


import './Calendar.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';

import CalendarDay from './CalendarDay';


/**
 * Get the start and end time of a week
 * @param timestamp {Number}
 * @returns {{rangeStart: Number, rangeEnd: number}}
 */
function getWeekRange(timestamp) {
  const time = new Date(timestamp),
    day = time.getDay(),
    rangeStart = trimHours(timestamp - 1000 * 60 * 60 * 24 * day),
    rangeEnd = new Date(rangeStart).setDate(new Date(rangeStart).getDate() + 7) - 1;

  return {
    rangeStart,
    rangeEnd
  };
}


/**
 * Get the start and end time of a week
 * @param timestamp {Number}
 * @returns {{rangeStart: Number, rangeEnd: number}}
 */
function getMonthRange(timestamp) {
  const time = new Date(timestamp),
    rangeStart = trimHours(time.setDate(1)),
    rangeEnd = new Date(rangeStart).setMonth(time.getMonth() + 1) - 1;

  return {
    rangeStart,
    rangeEnd
  };
}


/**
 * Remove hour, minutes, seconds and milliseconds
 * @param timestamp {Number}
 * @returns {Number}
 */
function trimHours(timestamp) {
  const time = new Date(timestamp),
    year = time.getFullYear(),
    month = time.getMonth(),
    date = time.getDate();

  return new Date(year, month, date).valueOf();
}


export default class Calendar extends Component {


  /**
   * Get the start and end time of a month shown in calendar view
   * - previous and trailing dates of other months
   * @param timestamp {Number}
   * @returns [Date]
   */
  getShowMonthRange(timestamp) {
    let monthRange = getMonthRange(timestamp),
      rangeStart = getWeekRange(monthRange.rangeStart).rangeStart,
      rangeEnd = getWeekRange(monthRange.rangeEnd).rangeEnd,
      dates = [];

    while (rangeStart < rangeEnd) {
      dates.push(rangeStart);
      rangeStart += 1000 * 60 * 60 * 24;
    }

    return dates;
  }

  render() {
    const {
        className,
        date,
        highlights,
        marks
      } = this.props,

      classes = mixClass({
        'calendar': true,
        '$': className
      }),

      timeRange = this.getShowMonthRange(date),

      dates = timeRange.map((date) => {
        return <CalendarDay key={date} date={new Date(date)} highlights={highlights} marks={marks} />;
      });

    return (
      <div className={classes}>
        <ul className="calendar-weeks">
          <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
        </ul>
        <ul className="calendar-days">
          {dates}
        </ul>
      </div>
    );
  }
}

Calendar.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  highlights: PropTypes.arrayOf(PropTypes.number),
  marks: PropTypes.arrayOf(PropTypes.number)
};

reactMixin(Calendar.prototype, PureRenderMixin);
