/**
 * Created by AshZhang on 15/11/12.
 */


import './PlusMinus.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Button from '../Button';
import Icon from '../Icon';


/**
 * Plus one
 * @param {Object} props
 */
function plus(props) {
  const value = props.value + 1;

  if (value <= props.max && props.onChange) {
    props.onChange(value);
  }
}


/**
 * Minus one
 * @param {Object} props
 */
function minus(props) {
  const value = props.value - 1;

  if (value >= props.min && props.onChange) {
    props.onChange(value);
  }
}


/**
 * PlusMinus class
 * @returns {XML}
 * @constructor
 */
export default function PlusMinus({
  className,
  value,
  ...props
}) {
  const classes = mixClass({
      'plus-minus': true,
      '$': className
    });

  return (
    <div className={classes} {...props}>
      <Button className="plus-minus-btn"
              icon="minus"
              link
              onTouchTap={minus.bind(null, arguments[0])} />

      <input className="plus-minus-text"
             type="text"
             value={value}
             readOnly />

      <Button className="plus-minus-btn"
              icon="plus"
              link
              onTouchTap={plus.bind(null, arguments[0])} />
    </div>
  );
}

PlusMinus.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

PlusMinus.defaultProps = {
  min: 0
};
