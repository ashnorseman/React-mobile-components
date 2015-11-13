/**
 * Created by AshZhang on 15/11/12.
 */


'use strict';

require('./PlusMinus.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Button = require('../Button/Button');
const Icon = require('../Icon/Icon');


const PlusMinus = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    value: React.PropTypes.number,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    onChange: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      min: 0
    };
  },

  render() {
    const {
            className,
            value
          } = this.props,

          classes = mixClass({
            'plus-minus': true,
            '$': className
          });

    return (
      <div className={classes}>
        <Button className='plus-minus-btn' link onTouchTap={this.minus} icon='minus'></Button>
        <input className='plus-minus-text' type='text' value={value} readOnly />
        <Button className='plus-minus-btn' link onTouchTap={this.plus} icon='plus'></Button>
      </div>
    );
  },


  plus() {
    const value = this.props.value + 1;

    if (value <= this.props.max && (typeof this.props.onChange === 'function')) {
      this.props.onChange.call(this, value);
    }
  },


  minus() {
    const value = this.props.value - 1;

    if (value >= this.props.min && (typeof this.props.onChange === 'function')) {
      this.props.onChange.call(this, value);
    }
  }
});


module.exports = PlusMinus;