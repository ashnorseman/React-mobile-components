/**
 * Created by AshZhang on 15/11/9.
 */


import './DropdownItem.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default function DropdownItem({
  active,
  className,
  name,
  text,
  ...props
}) {
  const classes = mixClass({
      'dropdown-item': true,
      '$': className,
      active
    });

  return (
    <li className={classes} {...props}>
      <div className="dropdown-item-text">
        {text}
        {active ? <Icon name="checked" /> : null}
      </div>
    </li>
  );
}

DropdownItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
