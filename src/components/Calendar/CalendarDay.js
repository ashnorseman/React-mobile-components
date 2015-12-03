/**
 * Created by AshZhang on 15/12/3.
 */


import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default class CalendarDay extends Component {


  render() {
    const {
        date,
        highlights,
        marks
      } = this.props,

      hasMark = marks.indexOf(date.valueOf()) > -1,

      today = new Date(),

      sameMonth = today.getMonth() === date.getMonth(),

      classes = mixClass({
        'calendar-highlight': highlights.indexOf(date.valueOf()) > -1,
        'calendar-mark': hasMark,
        'calendar-not-this-month': !sameMonth,
        'calendar-today': sameMonth && (today.getDate() === date.getDate())
      });

    return (
      <li className={classes}>
        <span>
          {date.getDate()}
          {
            hasMark ? <Icon name="bag" /> : null
          }
        </span>
      </li>
    );
  }
}

CalendarDay.propTypes = {
  date: PropTypes.object,
  highlights: PropTypes.arrayOf(PropTypes.number),
  marks: PropTypes.arrayOf(PropTypes.number)
};

reactMixin(CalendarDay.prototype, PureRenderMixin);
