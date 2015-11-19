/**
 * Created by AshZhang on 15/11/12.
 */


import './PlusMinus.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';


export default class PlusMinus extends Component {

  plus() {
    const value = this.props.value + 1;

    if (value <= this.props.max && (typeof this.props.onChange === 'function')) {
      this.props.onChange.call(this, value);
    }
  }

  minus() {
    const value = this.props.value - 1;

    if (value >= this.props.min && (typeof this.props.onChange === 'function')) {
      this.props.onChange.call(this, value);
    }
  }

  render() {
    const {
            className,
            value
          } = this.props,

          classes = mixClass({
            'plus-minus': true,
            '$'         : className
          });

    return (
      <div className={classes}>
        <Button className="plus-minus-btn" link onTouchTap={this.minus.bind(this)} icon="minus" />
        <input className="plus-minus-text" type="text" value={value} readOnly />
        <Button className="plus-minus-btn" link onTouchTap={this.plus.bind(this)} icon="plus" />
      </div>
    );
  }
}

PlusMinus.propTypes = {
  className: PropTypes.string,
  max      : PropTypes.number,
  min      : PropTypes.number,
  value    : PropTypes.number,
  onChange : PropTypes.func
};

PlusMinus.defaultProps = {
  min: 0
};

reactMixin(PlusMinus.prototype, PureRenderMixin);
