/**
 * Created by AshZhang on 15/10/30.
 */


import './CheckButton.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default function CheckButton({
  checked,
  children,
  className,
  onToggle,
  ...props
}) {
  const classes = mixClass({
          'btn': true,
          'btn-link': true,
          'check-btn': true,
          'check-btn-checked': checked,
          '$': className
        });

  return (
    <button type="button"
            className={classes}
            {...props}
            onTouchTap={onToggle && onToggle.bind(null, !checked)}>
      <Icon name={checked ? 'checked' : 'unchecked'} />
      {children}
    </button>
  );
}


CheckButton.propTypes = {
  className: PropTypes.string,
  checked  : PropTypes.bool,
  children : PropTypes.node,
  onToggle : PropTypes.func
};
